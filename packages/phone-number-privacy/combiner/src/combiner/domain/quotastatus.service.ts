import {
  CombinerEndpoint,
  DomainQuotaStatusRequest,
  domainQuotaStatusRequestSchema,
  DomainQuotaStatusResponse,
  DomainQuotaStatusResponseSuccess,
  DomainSchema,
  DomainState,
  ErrorMessage,
  getSignerEndpoint,
  SignerEndpoint,
  verifyDomainQuotaStatusRequestAuthenticity,
  WarningMessage,
} from '@celo/phone-number-privacy-common'
import { Request, Response } from 'express'
import { OdisConfig, VERSION } from '../../config'
import { CombinerService, Session, SignerResponseWithStatus } from '../combiner.service'

interface DomainQuotaStatusResponseWithStatus extends SignerResponseWithStatus {
  url: string
  res: DomainQuotaStatusResponse
  status: number
}

export class DomainQuotaStatusService extends CombinerService<
  DomainQuotaStatusRequest,
  DomainQuotaStatusResponse
> {
  protected endpoint: CombinerEndpoint
  protected signerEndpoint: SignerEndpoint
  protected responses: DomainQuotaStatusResponseWithStatus[]

  public constructor(config: OdisConfig) {
    super(config)
    this.endpoint = CombinerEndpoint.DOMAIN_QUOTA_STATUS
    this.signerEndpoint = getSignerEndpoint(this.endpoint)
    this.responses = []
  }

  protected validate(
    request: Request<{}, {}, unknown>
  ): request is Request<{}, {}, DomainQuotaStatusRequest> {
    return domainQuotaStatusRequestSchema(DomainSchema).is(request.body)
  }

  protected authenticate(request: Request<{}, {}, DomainQuotaStatusRequest>): Promise<boolean> {
    return Promise.resolve(verifyDomainQuotaStatusRequestAuthenticity(request.body))
  }

  protected reqKeyHeaderCheck(_request: Request<{}, {}, DomainQuotaStatusRequest>): boolean {
    return true // does not require key header
  }

  protected async handleResponseOK(
    data: string,
    status: number,
    url: string,
    session: Session<DomainQuotaStatusRequest, DomainQuotaStatusResponse>
  ): Promise<void> {
    const res = JSON.parse(data)

    if (!res.success) {
      session.logger.warn({ signer: url, error: res.error }, 'Signer responded with error')
      throw new Error(res.error) // TODO(Alec): Can this part be factored out?
    }

    session.logger.info({ signer: url }, `Signer request successful`)
    this.responses.push({ url, res, status })
  }

  // protected abstract combine(session: Session<R>): Promise<void>

  protected async combine(
    session: Session<DomainQuotaStatusRequest, DomainQuotaStatusResponse>
  ): Promise<void> {
    if (this.responses.length >= this.threshold) {
      // A
      try {
        const domainQuotaStatus = this.findThresholdDomainState(session)
        session.response.json({
          success: true,
          status: domainQuotaStatus,
          version: VERSION,
        })
        return
      } catch (error) {
        session.logger.error({ error }, 'Error combining signer quota status responses')
      }
    }
    this.sendFailureResponse(
      ErrorMessage.THRESHOLD_DOMAIN_QUOTA_STATUS_FAILURE,
      session.getMajorityErrorCode() ?? 500, // B
      session
    )
  }

  protected sendSuccessResponse(
    response: Response<DomainQuotaStatusResponseSuccess>,
    quotaStatus: DomainState,
    statusCode: number
  ) {
    response.status(statusCode).json({
      success: true,
      version: VERSION,
      status: quotaStatus,
    })
  }

  private findThresholdDomainState(
    session: Session<DomainQuotaStatusRequest, DomainQuotaStatusResponse>
  ): DomainState {
    const domainStates = this.responses.map(
      (s) => (s.res as DomainQuotaStatusResponseSuccess).status // TODO(Alec)
    )
    if (domainStates.length < this.threshold) {
      throw new Error('Insufficient number of signer responses')
    }

    const domainStatesEnabled = domainStates.filter((ds) => !ds.disabled)
    const numDisabled = domainStates.length - domainStatesEnabled.length

    if (numDisabled > 0 && numDisabled < domainStates.length) {
      session.logger.warn(WarningMessage.INCONSISTENT_SIGNER_DOMAIN_DISABLED_STATES)
    }

    if (this.signers.length - numDisabled < this.threshold) {
      return { timer: 0, counter: 0, disabled: true, date: 0 }
    }

    if (domainStatesEnabled.length < this.threshold) {
      throw new Error('Insufficient number of signer responses. Domain may be disabled')
    }

    const n = this.threshold - 1

    const domainStatesAscendingByCounter = domainStatesEnabled.sort((a, b) => a.counter - b.counter)
    const nthLeastRestrictiveByCounter = domainStatesAscendingByCounter[n]
    const thresholdCounter = nthLeastRestrictiveByCounter.counter

    // Client should submit requests with nonce === thresholdCounter

    const domainStatesWithThresholdCounter = domainStatesEnabled.filter(
      (ds) => ds.counter <= thresholdCounter
    )
    const domainStatesAscendingByTimer = domainStatesWithThresholdCounter.sort(
      (a, b) => a.timer - b.timer
    )
    const nthLeastRestrictiveByTimer = domainStatesAscendingByTimer[n]
    const thresholdTimer = nthLeastRestrictiveByTimer.timer

    const domainStatesAscendingByDate = domainStatesWithThresholdCounter.sort(
      (a, b) => a.date - b.date
    )
    const nthLeastRestrictiveByDate = domainStatesAscendingByDate[n]
    const thresholdDate = nthLeastRestrictiveByDate.date

    return {
      timer: thresholdTimer,
      counter: thresholdCounter,
      disabled: false,
      date: thresholdDate,
    }
  }
}
