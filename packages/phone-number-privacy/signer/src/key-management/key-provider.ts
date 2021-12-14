import { rootLogger as logger } from '@celo/phone-number-privacy-common'
import config, { DefaultKeyName, SupportedKeystore } from '../config'
import { AWSKeyProvider } from './aws-key-provider'
import { AzureKeyProvider } from './azure-key-provider'
import { GoogleKeyProvider } from './google-key-provider'
import { Key, KeyProvider } from './key-provider-base'
import { MockKeyProvider } from './mock-key-provider'

let keyProvider: KeyProvider

export const keysToPrefetch: Key[] = [
  {
    name: DefaultKeyName.PHONE_NUMBER_PRIVACY,
    version: config.keystore.keys.phoneNumberPrivacy.latest,
  },
  {
    name: DefaultKeyName.DOMAINS,
    version: config.keystore.keys.domains.latest,
  },
]

export async function initKeyProvider() {
  logger.info('Initializing keystore')
  const type = config.keystore.type
  if (type === SupportedKeystore.AzureKeyVault) {
    logger.info('Using Azure key vault')
    keyProvider = new AzureKeyProvider()
  } else if (type === SupportedKeystore.GoogleSecretManager) {
    logger.info('Using Google Secret Manager')
    keyProvider = new GoogleKeyProvider()
  } else if (type === SupportedKeystore.AWSSecretManager) {
    logger.info('Using AWS Secret Manager')
    keyProvider = new AWSKeyProvider()
  } else if (type === SupportedKeystore.MockSecretManager) {
    logger.info('Using Mock Secret Manager')
    keyProvider = new MockKeyProvider()
  } else {
    throw new Error('Valid keystore type must be provided')
  }
  logger.info(`Fetching keys: ${JSON.stringify(keysToPrefetch)}`)
  await Promise.all(keysToPrefetch.map(keyProvider.fetchPrivateKeyFromStore))
  logger.info('Done fetching key. Key provider initialized successfully.')
}

export function getKeyProvider() {
  if (!keyProvider) {
    throw new Error('Key provider has not been properly initialized')
  }

  return keyProvider
}
