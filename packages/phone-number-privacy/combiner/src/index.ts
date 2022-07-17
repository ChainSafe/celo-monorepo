import {
  CombinerEndpoint as Endpoint,
  disableDomainRequestSchema,
  DisableDomainResponseSchema,
  domainQuotaStatusRequestSchema,
  domainQuotaStatusResponseSchema,
  domainRestrictedSignatureRequestSchema,
  domainRestrictedSignatureResponseSchema,
  DomainSchema,
  ErrorMessage,
  loggerMiddleware,
  SequentialDelayDomainStateSchema,
  SignMessageRequestSchema,
  SignMessageResponseSchema,
} from '@celo/phone-number-privacy-common'
import Logger from 'bunyan'
import * as functions from 'firebase-functions'
import { performance, PerformanceObserver } from 'perf_hooks'
import config from './config'
import { handleGetContactMatches } from './match-making/get-contact-matches'
import { Controller } from './refactor/controller'
import { DomainDisableAction } from './refactor/domain/endpoints/disable/action'
import { DomainDisableIO } from './refactor/domain/endpoints/disable/io'
import { DomainQuotaAction } from './refactor/domain/endpoints/quota/action'
import { DomainQuotaIO } from './refactor/domain/endpoints/quota/io'
import { DomainSignAction } from './refactor/domain/endpoints/sign/action'
import { DomainSignIO } from './refactor/domain/endpoints/sign/io'
import { DomainStateCombinerService } from './refactor/domain/services/thresholdState'
import { PnpSignAction } from './refactor/pnp/endpoints/sign/action'
import { PnpSignIO } from './refactor/pnp/endpoints/sign/io'

require('dotenv').config()

async function meterResponse(
  handler: (req: functions.Request, res: functions.Response) => Promise<void>,
  req: functions.Request,
  res: functions.Response,
  endpoint: Endpoint
) {
  if (!res.locals) {
    res.locals = {}
  }
  const logger: Logger = loggerMiddleware(req, res)
  logger.fields.endpoint = endpoint
  logger.info({ req: req.body }, 'Request received')
  const eventLoopLagMeasurementStart = Date.now()
  setTimeout(() => {
    const eventLoopLag = Date.now() - eventLoopLagMeasurementStart
    logger.info({ eventLoopLag }, 'Measure event loop lag')
  })
  const startMark = `Begin ${handler.name}`
  const endMark = `End ${handler.name}`
  const entryName = `${handler.name} latency`

  const obs = new PerformanceObserver((list) => {
    const entry = list.getEntriesByName(entryName)[0]
    if (entry) {
      logger.info({ latency: entry }, 'e2e response latency measured')
    }
  })
  obs.observe({ entryTypes: ['measure'], buffered: true })

  performance.mark(startMark)
  await handler(req, res)
    .then(() => {
      logger.info({ res }, 'Response sent')
    })
    .catch((err) => {
      logger.error(ErrorMessage.UNKNOWN_ERROR)
      logger.error(err)
    })
  performance.mark(endMark)
  performance.measure(entryName, startMark, endMark)
  performance.clearMarks()
  obs.disconnect()
}

export const getContactMatches = functions
  .region('us-central1', 'europe-west3')
  .runWith(config.cloudFunction)
  .https.onRequest(async (req: functions.Request, res: functions.Response) => {
    return meterResponse(handleGetContactMatches, req, res, Endpoint.MATCHMAKING)
  })

const pnpSignHandler = new Controller(
  new PnpSignAction(
    config.phoneNumberPrivacy,
    new PnpSignIO(config.phoneNumberPrivacy, SignMessageRequestSchema, SignMessageResponseSchema)
  )
)
export const getBlindedMessageSig = functions
  .region('us-central1', 'europe-west3')
  .runWith(config.cloudFunction)
  .https.onRequest(async (req: functions.Request, res: functions.Response) => {
    // TODO(Alec): look for other places where 'bind' is needed
    return meterResponse(
      pnpSignHandler.handle.bind(pnpSignHandler),
      req,
      res,
      Endpoint.SIGN_MESSAGE
    )
  })

const domainSignHandler = new Controller(
  new DomainSignAction(
    config.domains,
    new DomainSignIO(
      config.domains,
      domainRestrictedSignatureRequestSchema(DomainSchema),
      domainRestrictedSignatureResponseSchema(SequentialDelayDomainStateSchema)
    ),
    new DomainStateCombinerService(config.domains)
  )
)
export const domainSign = functions // TODO(Alec): For integration tests, can call these functions directly rather than using supertest pkg
  .region('us-central1', 'europe-west3')
  .runWith(config.cloudFunction)
  .https.onRequest(async (req: functions.Request, res: functions.Response) => {
    return meterResponse(domainSignHandler.handle, req, res, Endpoint.DOMAIN_SIGN)
  })

const domainQuotaStatusHandler = new Controller(
  new DomainQuotaAction(
    config.domains,
    new DomainQuotaIO(
      config.domains,
      domainQuotaStatusRequestSchema(DomainSchema),
      domainQuotaStatusResponseSchema(SequentialDelayDomainStateSchema)
    ),
    new DomainStateCombinerService(config.domains)
  )
)
export const domainQuotaStatus = functions
  .region('us-central1', 'europe-west3')
  .runWith(config.cloudFunction)
  .https.onRequest(async (req: functions.Request, res: functions.Response) => {
    return meterResponse(domainQuotaStatusHandler.handle, req, res, Endpoint.DOMAIN_QUOTA_STATUS)
  })

const domainDisableHandler = new Controller(
  new DomainDisableAction(
    config.domains,
    new DomainDisableIO(
      config.domains,
      disableDomainRequestSchema(DomainSchema),
      DisableDomainResponseSchema
    )
  )
)
export const domainDisable = functions
  .region('us-central1', 'europe-west3')
  .runWith(config.cloudFunction)
  .https.onRequest(async (req: functions.Request, res: functions.Response) => {
    return meterResponse(domainDisableHandler.handle, req, res, Endpoint.DISABLE_DOMAIN)
  })
