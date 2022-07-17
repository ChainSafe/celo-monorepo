import {
  CombinerEndpoint,
  DomainRestrictedSignatureRequest,
  getSignerEndpoint,
  SignerEndpoint,
} from '@celo/phone-number-privacy-common'
import { OdisConfig } from '../../../../config'
import { IO } from '../../../base/io'
import { Sign } from '../../../base/sign'
import { Session } from '../../../session'
import { DomainStateCombinerService } from '../../services/thresholdState'

export class DomainSignAction extends Sign<DomainRestrictedSignatureRequest> {
  readonly endpoint: CombinerEndpoint = CombinerEndpoint.DOMAIN_SIGN
  readonly signerEndpoint: SignerEndpoint = getSignerEndpoint(this.endpoint)

  constructor(
    readonly config: OdisConfig,
    readonly io: IO<DomainRestrictedSignatureRequest>,
    readonly stateCombiner: DomainStateCombinerService<DomainRestrictedSignatureRequest>
  ) {
    super(config, io)
  }

  async combine(session: Session<DomainRestrictedSignatureRequest>): Promise<void> {
    this.logResponseDiscrepancies(session)

    if (session.crypto.hasSufficientSignatures()) {
      try {
        const combinedSignature = await session.crypto.combinePartialBlindedSignatures(
          this.parseBlindedMessage(session.request.body),
          session.logger
        )
        return this.io.sendSuccess(
          200,
          session.response,
          session.logger,
          combinedSignature,
          this.stateCombiner.findThresholdDomainState(session)
        )
      } catch {
        // May fail upon combining signatures if too many sigs are invalid
        // Fallback to handleMissingSignatures
      }
    }

    this.handleMissingSignatures(session)
  }

  protected parseBlindedMessage(req: DomainRestrictedSignatureRequest): string {
    return req.blindedMessage
  }

  protected logResponseDiscrepancies(_session: Session<DomainRestrictedSignatureRequest>): void {
    // TODO
    throw new Error('Method not implemented.')
  }
}
