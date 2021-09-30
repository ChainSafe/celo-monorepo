import { EIP712Object, EIP712ObjectValue } from '@celo/utils/lib/sign-typed-data-utils'

/**
 * Utility type representing an optional value in a EIP-712 compatible manner, as long as the
 * concrete type T is a subtype of EIP712ObjectValue.
 */
export type Optional<T> = {
  defined: boolean
  value: T
}

// Compile-time check that Domain can be cast to type EIP712Object
declare let TEST_OPTIONAL_IS_EIP712: EIP712Object
TEST_OPTIONAL_IS_EIP712 = ({} as unknown) as Optional<EIP712ObjectValue>

/**
 * ODIS OPRF domain specifier interface as described in CIP-40
 * https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0040.md
 */
export interface Domain {
  /** Unique name of the domain. (e.g. "ODIS Password Domain") */
  name: string
  /** Version number. Allows for backwards incompatible changes. */
  version: string
  /** Arbitrary key-value pairs. Must be serializeable to EIP-712 encoding. */
  [key: string]: EIP712ObjectValue
}

/**
 * Options that accompany a Domain in a request to ODIS. Concrete subtype is determined by the
 * concrete subtype of Domain.
 * Note: DomainOptions is simply an alias of EIP712Object.
 */
export type DomainOptions = EIP712Object

// Compile-time check that Domain can be cast to type EIP712Object
declare let TEST_DOMAIN_IS_EIP712: EIP712Object
TEST_DOMAIN_IS_EIP712 = ({} as unknown) as Domain

export type SequentialDelayStage = {
  // How many seconds each batch of attempts in this stage is delayed with
  // respect to the timer.
  delay: number
  // Whether the timer should be reset between attempts during this stage.
  // Defaults to true.
  resetTimer: Optional<boolean>
  // The number of continuous attempts a user gets before the next delay
  // in each repetition of this stage. Defaults to 1.
  batchSize: Optional<number>
  // The number of times this stage repeats before continuing to the next stage
  // in the RateLimit array. Defaults to 1.
  repetitions: Optional<number>
}

export type SequentialDelayDomain = {
  name: 'Sequential Delay Domain'
  version: '1'
  stages: SequentialDelayStage[]
  // Optional public key of a against which signed requests must be authenticated.
  // In the case of Cloud Backup, this will be a one-time key stored with the ciphertext.
  publicKey: Optional<string>
  // Optional string to distinguish the output of this domain instance from
  // other SequentialDelayDomain instances
  salt: Optional<string>
}

export type SequentialDelayDomainOptions = {
  // EIP-712 signature over the entire request by the key specified in the domain.
  // Required if `publicKey` is defined in the domain instance. If `publicKey` is
  // not defined in the domain instance, then a signature must not be provided.
  signature: Optional<string>
  // Used to prevent replay attacks. Required if a signature is provided.
  nonce: Optional<number>
}

// Compile-time check that SequentialDelayDomain can be cast to type Domain
declare let TEST_SEQUENTIAL_DELAY_DOMAIN_IS_DOMAIN: Domain
TEST_SEQUENTIAL_DELAY_DOMAIN_IS_DOMAIN = ({} as unknown) as SequentialDelayDomain

// Compile-time check that SequentialDelayDomainOptions can be cast to type EIP712Object
declare let TEST_SEQUENTIAL_DELAY_DOMAIN_OPTIONS_ARE_DOMAIN_OPTIONS: DomainOptions
TEST_SEQUENTIAL_DELAY_DOMAIN_OPTIONS_ARE_DOMAIN_OPTIONS = ({} as unknown) as SequentialDelayDomainOptions