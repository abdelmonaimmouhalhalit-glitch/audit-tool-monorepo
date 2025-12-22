# StartAuditRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tenantId** | **string** | ID interne du client (Organisation) | [optional] [default to undefined]
**targets** | **Array&lt;string&gt;** | Les environnements à scanner. | [default to undefined]
**scanType** | **string** |  | [optional] [default to ScanTypeEnum_Quick]

## Example

```typescript
import { StartAuditRequest } from '@audit-tool-monorepo/api-client';

const instance: StartAuditRequest = {
    tenantId,
    targets,
    scanType,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
