[@celo/contractkit](../README.md) › [Globals](../globals.md) › ["web3-contract-cache"](../modules/_web3_contract_cache_.md) › [Web3ContractCache](_web3_contract_cache_.web3contractcache.md)

# Class: Web3ContractCache

Native Web3 contracts factory and cache.

Exposes accessors to all `CeloContract` web3 contracts.

Mostly a private cache, kit users would normally use
a contract wrapper

## Hierarchy

* **Web3ContractCache**

## Index

### Constructors

* [constructor](_web3_contract_cache_.web3contractcache.md#constructor)

### Properties

* [registry](_web3_contract_cache_.web3contractcache.md#readonly-registry)

### Methods

* [getAccounts](_web3_contract_cache_.web3contractcache.md#getaccounts)
* [getAttestations](_web3_contract_cache_.web3contractcache.md#getattestations)
* [getBlockchainParameters](_web3_contract_cache_.web3contractcache.md#getblockchainparameters)
* [getContract](_web3_contract_cache_.web3contractcache.md#getcontract)
* [getDoubleSigningSlasher](_web3_contract_cache_.web3contractcache.md#getdoublesigningslasher)
* [getDowntimeSlasher](_web3_contract_cache_.web3contractcache.md#getdowntimeslasher)
* [getElection](_web3_contract_cache_.web3contractcache.md#getelection)
* [getEpochRewards](_web3_contract_cache_.web3contractcache.md#getepochrewards)
* [getErc20](_web3_contract_cache_.web3contractcache.md#geterc20)
* [getEscrow](_web3_contract_cache_.web3contractcache.md#getescrow)
* [getExchange](_web3_contract_cache_.web3contractcache.md#getexchange)
* [getFederatedAttestations](_web3_contract_cache_.web3contractcache.md#getfederatedattestations)
* [getFeeCurrencyWhitelist](_web3_contract_cache_.web3contractcache.md#getfeecurrencywhitelist)
* [getFreezer](_web3_contract_cache_.web3contractcache.md#getfreezer)
* [getGasPriceMinimum](_web3_contract_cache_.web3contractcache.md#getgaspriceminimum)
* [getGoldToken](_web3_contract_cache_.web3contractcache.md#getgoldtoken)
* [getGovernance](_web3_contract_cache_.web3contractcache.md#getgovernance)
* [getGrandaMento](_web3_contract_cache_.web3contractcache.md#getgrandamento)
* [getLockedGold](_web3_contract_cache_.web3contractcache.md#getlockedgold)
* [getMetaTransactionWallet](_web3_contract_cache_.web3contractcache.md#getmetatransactionwallet)
* [getMetaTransactionWalletDeployer](_web3_contract_cache_.web3contractcache.md#getmetatransactionwalletdeployer)
* [getMultiSig](_web3_contract_cache_.web3contractcache.md#getmultisig)
* [getRandom](_web3_contract_cache_.web3contractcache.md#getrandom)
* [getRegistry](_web3_contract_cache_.web3contractcache.md#getregistry)
* [getReserve](_web3_contract_cache_.web3contractcache.md#getreserve)
* [getSortedOracles](_web3_contract_cache_.web3contractcache.md#getsortedoracles)
* [getStableToken](_web3_contract_cache_.web3contractcache.md#getstabletoken)
* [getStableTokenRegistry](_web3_contract_cache_.web3contractcache.md#getstabletokenregistry)
* [getTransferWhitelist](_web3_contract_cache_.web3contractcache.md#gettransferwhitelist)
* [getValidators](_web3_contract_cache_.web3contractcache.md#getvalidators)
* [invalidateContract](_web3_contract_cache_.web3contractcache.md#invalidatecontract)

## Constructors

###  constructor

\+ **new Web3ContractCache**(`registry`: [AddressRegistry](_address_registry_.addressregistry.md)): *[Web3ContractCache](_web3_contract_cache_.web3contractcache.md)*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:102](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L102)*

core contract's address registry

**Parameters:**

Name | Type |
------ | ------ |
`registry` | [AddressRegistry](_address_registry_.addressregistry.md) |

**Returns:** *[Web3ContractCache](_web3_contract_cache_.web3contractcache.md)*

## Properties

### `Readonly` registry

• **registry**: *[AddressRegistry](_address_registry_.addressregistry.md)*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:104](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L104)*

## Methods

###  getAccounts

▸ **getAccounts**(): *Promise‹Accounts‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:105](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L105)*

**Returns:** *Promise‹Accounts‹››*

___

###  getAttestations

▸ **getAttestations**(): *Promise‹Attestations‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:108](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L108)*

**Returns:** *Promise‹Attestations‹››*

___

###  getBlockchainParameters

▸ **getBlockchainParameters**(): *Promise‹BlockchainParameters‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:111](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L111)*

**Returns:** *Promise‹BlockchainParameters‹››*

___

###  getContract

▸ **getContract**<**C**>(`contract`: C, `address?`: undefined | string): *Promise‹NonNullable‹ContractCacheMap[C]››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:196](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L196)*

Get native web3 contract wrapper

**Type parameters:**

▪ **C**: *keyof typeof ContractFactories*

**Parameters:**

Name | Type |
------ | ------ |
`contract` | C |
`address?` | undefined &#124; string |

**Returns:** *Promise‹NonNullable‹ContractCacheMap[C]››*

___

###  getDoubleSigningSlasher

▸ **getDoubleSigningSlasher**(): *Promise‹DoubleSigningSlasher‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:114](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L114)*

**Returns:** *Promise‹DoubleSigningSlasher‹››*

___

###  getDowntimeSlasher

▸ **getDowntimeSlasher**(): *Promise‹DowntimeSlasher‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:117](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L117)*

**Returns:** *Promise‹DowntimeSlasher‹››*

___

###  getElection

▸ **getElection**(): *Promise‹Election‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:120](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L120)*

**Returns:** *Promise‹Election‹››*

___

###  getEpochRewards

▸ **getEpochRewards**(): *Promise‹EpochRewards‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:123](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L123)*

**Returns:** *Promise‹EpochRewards‹››*

___

###  getErc20

▸ **getErc20**(`address`: string): *Promise‹Ierc20‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:126](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L126)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *Promise‹Ierc20‹››*

___

###  getEscrow

▸ **getEscrow**(): *Promise‹Escrow‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:129](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L129)*

**Returns:** *Promise‹Escrow‹››*

___

###  getExchange

▸ **getExchange**(`stableToken`: [StableToken](../enums/_base_.celocontract.md#stabletoken)): *Promise‹Registry‹› | Accounts‹› | Exchange‹› | Ierc20‹› | GoldToken‹› | StableToken‹› | Attestations‹› | BlockchainParameters‹› | DoubleSigningSlasher‹› | DowntimeSlasher‹› | Election‹› | EpochRewards‹› | Escrow‹› | ExchangeEur‹› | ExchangeBrl‹› | FederatedAttestations‹› | FeeCurrencyWhitelist‹› | Freezer‹› | GasPriceMinimum‹› | Governance‹› | GrandaMento‹› | LockedGold‹› | MetaTransactionWallet‹› | MetaTransactionWalletDeployer‹› | MultiSig‹› | OdisPayments‹› | Random‹› | Reserve‹› | SortedOracles‹› | StableTokenRegistry‹› | TransferWhitelist‹› | Validators‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:132](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L132)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`stableToken` | [StableToken](../enums/_base_.celocontract.md#stabletoken) | StableToken.cUSD |

**Returns:** *Promise‹Registry‹› | Accounts‹› | Exchange‹› | Ierc20‹› | GoldToken‹› | StableToken‹› | Attestations‹› | BlockchainParameters‹› | DoubleSigningSlasher‹› | DowntimeSlasher‹› | Election‹› | EpochRewards‹› | Escrow‹› | ExchangeEur‹› | ExchangeBrl‹› | FederatedAttestations‹› | FeeCurrencyWhitelist‹› | Freezer‹› | GasPriceMinimum‹› | Governance‹› | GrandaMento‹› | LockedGold‹› | MetaTransactionWallet‹› | MetaTransactionWalletDeployer‹› | MultiSig‹› | OdisPayments‹› | Random‹› | Reserve‹› | SortedOracles‹› | StableTokenRegistry‹› | TransferWhitelist‹› | Validators‹››*

___

###  getFederatedAttestations

▸ **getFederatedAttestations**(): *Promise‹FederatedAttestations‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:135](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L135)*

**Returns:** *Promise‹FederatedAttestations‹››*

___

###  getFeeCurrencyWhitelist

▸ **getFeeCurrencyWhitelist**(): *Promise‹FeeCurrencyWhitelist‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:138](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L138)*

**Returns:** *Promise‹FeeCurrencyWhitelist‹››*

___

###  getFreezer

▸ **getFreezer**(): *Promise‹Freezer‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:141](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L141)*

**Returns:** *Promise‹Freezer‹››*

___

###  getGasPriceMinimum

▸ **getGasPriceMinimum**(): *Promise‹GasPriceMinimum‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:144](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L144)*

**Returns:** *Promise‹GasPriceMinimum‹››*

___

###  getGoldToken

▸ **getGoldToken**(): *Promise‹GoldToken‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:147](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L147)*

**Returns:** *Promise‹GoldToken‹››*

___

###  getGovernance

▸ **getGovernance**(): *Promise‹Governance‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:150](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L150)*

**Returns:** *Promise‹Governance‹››*

___

###  getGrandaMento

▸ **getGrandaMento**(): *Promise‹GrandaMento‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:153](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L153)*

**Returns:** *Promise‹GrandaMento‹››*

___

###  getLockedGold

▸ **getLockedGold**(): *Promise‹LockedGold‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:156](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L156)*

**Returns:** *Promise‹LockedGold‹››*

___

###  getMetaTransactionWallet

▸ **getMetaTransactionWallet**(`address`: string): *Promise‹MetaTransactionWallet‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:159](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L159)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *Promise‹MetaTransactionWallet‹››*

___

###  getMetaTransactionWalletDeployer

▸ **getMetaTransactionWalletDeployer**(`address`: string): *Promise‹MetaTransactionWalletDeployer‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:162](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *Promise‹MetaTransactionWalletDeployer‹››*

___

###  getMultiSig

▸ **getMultiSig**(`address`: string): *Promise‹MultiSig‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:165](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L165)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *Promise‹MultiSig‹››*

___

###  getRandom

▸ **getRandom**(): *Promise‹Random‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:168](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L168)*

**Returns:** *Promise‹Random‹››*

___

###  getRegistry

▸ **getRegistry**(): *Promise‹Registry‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:171](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L171)*

**Returns:** *Promise‹Registry‹››*

___

###  getReserve

▸ **getReserve**(): *Promise‹Reserve‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:174](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L174)*

**Returns:** *Promise‹Reserve‹››*

___

###  getSortedOracles

▸ **getSortedOracles**(): *Promise‹SortedOracles‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:177](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L177)*

**Returns:** *Promise‹SortedOracles‹››*

___

###  getStableToken

▸ **getStableToken**(`stableToken`: [StableToken](../enums/_base_.celocontract.md#stabletoken)): *Promise‹Registry‹› | Accounts‹› | Exchange‹› | Ierc20‹› | GoldToken‹› | StableToken‹› | Attestations‹› | BlockchainParameters‹› | DoubleSigningSlasher‹› | DowntimeSlasher‹› | Election‹› | EpochRewards‹› | Escrow‹› | ExchangeEur‹› | ExchangeBrl‹› | FederatedAttestations‹› | FeeCurrencyWhitelist‹› | Freezer‹› | GasPriceMinimum‹› | Governance‹› | GrandaMento‹› | LockedGold‹› | MetaTransactionWallet‹› | MetaTransactionWalletDeployer‹› | MultiSig‹› | OdisPayments‹› | Random‹› | Reserve‹› | SortedOracles‹› | StableTokenRegistry‹› | TransferWhitelist‹› | Validators‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:180](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L180)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`stableToken` | [StableToken](../enums/_base_.celocontract.md#stabletoken) | StableToken.cUSD |

**Returns:** *Promise‹Registry‹› | Accounts‹› | Exchange‹› | Ierc20‹› | GoldToken‹› | StableToken‹› | Attestations‹› | BlockchainParameters‹› | DoubleSigningSlasher‹› | DowntimeSlasher‹› | Election‹› | EpochRewards‹› | Escrow‹› | ExchangeEur‹› | ExchangeBrl‹› | FederatedAttestations‹› | FeeCurrencyWhitelist‹› | Freezer‹› | GasPriceMinimum‹› | Governance‹› | GrandaMento‹› | LockedGold‹› | MetaTransactionWallet‹› | MetaTransactionWalletDeployer‹› | MultiSig‹› | OdisPayments‹› | Random‹› | Reserve‹› | SortedOracles‹› | StableTokenRegistry‹› | TransferWhitelist‹› | Validators‹››*

___

###  getStableTokenRegistry

▸ **getStableTokenRegistry**(): *Promise‹StableTokenRegistry‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:189](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L189)*

**Returns:** *Promise‹StableTokenRegistry‹››*

___

###  getTransferWhitelist

▸ **getTransferWhitelist**(): *Promise‹TransferWhitelist‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:183](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L183)*

**Returns:** *Promise‹TransferWhitelist‹››*

___

###  getValidators

▸ **getValidators**(): *Promise‹Validators‹››*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:186](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L186)*

**Returns:** *Promise‹Validators‹››*

___

###  invalidateContract

▸ **invalidateContract**<**C**>(`contract`: C): *void*

*Defined in [packages/sdk/contractkit/src/web3-contract-cache.ts:213](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/web3-contract-cache.ts#L213)*

**Type parameters:**

▪ **C**: *keyof typeof ContractFactories*

**Parameters:**

Name | Type |
------ | ------ |
`contract` | C |

**Returns:** *void*
