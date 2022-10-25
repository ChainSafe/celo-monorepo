[@celo/contractkit](../README.md) › [Globals](../globals.md) › ["identity/metadata"](_identity_metadata_.md)

# Module: "identity/metadata"

## Index

### References

* [ClaimTypes](_identity_metadata_.md#claimtypes)

### Classes

* [IdentityMetadataWrapper](../classes/_identity_metadata_.identitymetadatawrapper.md)

### Type aliases

* [IdentityMetadata](_identity_metadata_.md#identitymetadata)

### Variables

* [IdentityMetadataType](_identity_metadata_.md#const-identitymetadatatype)

## References

###  ClaimTypes

• **ClaimTypes**:

## Type aliases

###  IdentityMetadata

Ƭ **IdentityMetadata**: *t.TypeOf‹typeof IdentityMetadataType›*

*Defined in [packages/sdk/contractkit/src/identity/metadata.ts:29](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L29)*

## Variables

### `Const` IdentityMetadataType

• **IdentityMetadataType**: *TypeC‹object›* = t.type({
  claims: t.array(ClaimType),
  meta: MetaType,
})

*Defined in [packages/sdk/contractkit/src/identity/metadata.ts:24](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/identity/metadata.ts#L24)*
