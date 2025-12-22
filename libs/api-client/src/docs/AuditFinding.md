# AuditFinding


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ruleId** | **string** |  | [optional] [default to undefined]
**level** | **string** |  | [optional] [default to undefined]
**message** | [**AuditFindingMessage**](AuditFindingMessage.md) |  | [optional] [default to undefined]
**locations** | [**Array&lt;AuditFindingLocationsInner&gt;**](AuditFindingLocationsInner.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AuditFinding } from '@audit-tool-monorepo/api-client';

const instance: AuditFinding = {
    ruleId,
    level,
    message,
    locations,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
