import { DB_TIMEOUT, Domain, domainHash, ErrorMessage } from '@celo/phone-number-privacy-common'
import Logger from 'bunyan'
import { Transaction } from 'knex'
import { Counters, Histograms, Labels } from '../../common/metrics'
import { getDatabase } from '../database'
import {
  DomainRequestRecord,
  DOMAIN_REQUESTS_COLUMNS,
  DOMAIN_REQUESTS_TABLE,
} from '../models/domainRequest'

function domainRequests() {
  return getDatabase()<DomainRequestRecord<Domain>>(DOMAIN_REQUESTS_TABLE)
}

export async function getDomainRequestRecordExists<D extends Domain>(
  domain: D,
  blindedMessage: string,
  trx: Transaction<DomainRequestRecord<D>>,
  logger: Logger
): Promise<boolean> {
  const getRequestRecordExistsMeter = Histograms.dbOpsInstrumentation
    .labels('getDomainRequestRecordExists')
    .startTimer()
  const hash = domainHash(domain).toString('hex')
  logger.debug({ domain, blindedMessage, hash }, 'Checking if domain request exists')
  try {
    const existingRequest = await domainRequests()
      .transacting(trx)
      .where({
        [DOMAIN_REQUESTS_COLUMNS.domainHash]: hash,
        [DOMAIN_REQUESTS_COLUMNS.blindedMessage]: blindedMessage,
      })
      .first()
      .timeout(DB_TIMEOUT)
    return !!existingRequest
  } catch (error) {
    Counters.databaseErrors.labels(Labels.read).inc()
    logger.error({ error }, ErrorMessage.DATABASE_GET_FAILURE)
    throw error
  } finally {
    getRequestRecordExistsMeter()
  }
}

export async function storeDomainRequestRecord<D extends Domain>(
  domain: D,
  blindedMessage: string,
  trx: Transaction<DomainRequestRecord<D>>,
  logger: Logger
) {
  const storeRequestRecordMeter = Histograms.dbOpsInstrumentation
    .labels('storeDomainRequestRecord')
    .startTimer()
  logger.debug({ domain, blindedMessage }, 'Storing domain restricted signature request')
  try {
    await domainRequests()
      .transacting(trx)
      .insert(new DomainRequestRecord(domain, blindedMessage))
      .timeout(DB_TIMEOUT)
  } catch (error) {
    Counters.databaseErrors.labels(Labels.update).inc()
    logger.error({ error }, ErrorMessage.DATABASE_UPDATE_FAILURE)
    throw error
  } finally {
    storeRequestRecordMeter()
  }
}
