# RemediationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**findingId** | **string** | ID unique de la vulnérabilité (issu du rapport SARIF) | [default to undefined]
**action** | **string** |  | [default to undefined]
**parameters** | **object** | Paramètres optionnels pour le correctif (ex: liste d\&#39;utilisateurs exclus) | [optional] [default to undefined]

## Example

```typescript
import { RemediationRequest } from '@audit-tool-monorepo/api-client';

const instance: RemediationRequest = {
    findingId,
    action,
    parameters,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
