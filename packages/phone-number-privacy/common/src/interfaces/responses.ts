import { Domain } from '../../src/domains'

export interface SignMessageResponse {
  success: boolean
  version?: string
  signature?: string
  performedQueryCount?: number
  totalQuota?: number
  blockNumber?: number
}

export interface SignMessageResponseFailure extends SignMessageResponse {
  success: false
  error: string
}

export interface SignMessageResponseSuccess extends SignMessageResponse {
  success: true
}

export interface GetQuotaResponse {
  success: boolean
  version: string
  performedQueryCount: number
  totalQuota: number
}

export interface GetContactMatchesResponse {
  success: boolean
  matchedContacts: Array<{
    phoneNumber: string
  }>
  version: string
}

export interface DomainStatusResponse {
  domain: Domain
  counter: number
  disabled: boolean
  timer: number
}
