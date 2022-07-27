import { PNP_DEV_SIGNER_PRIVATE_KEY } from '@celo/phone-number-privacy-common/lib/test/values'
import { Key, KeyProviderBase } from './key-provider-base'

export class MockKeyProvider extends KeyProviderBase {
  public async fetchPrivateKeyFromStore(key: Key) {
    this.setPrivateKey(key, PNP_DEV_SIGNER_PRIVATE_KEY)
  }
}
