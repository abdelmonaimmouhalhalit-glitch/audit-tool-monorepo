# RemediationApi

All URIs are relative to *http://localhost:3000/api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**executeRemediation**](#executeremediation) | **POST** /remediations | Appliquer un correctif de sécurité|

# **executeRemediation**
> executeRemediation(remediationRequest)

Lance une action corrective sur le tenant cible (ex: Activer MFA). Cette action est critique et sera logguée dans l\'audit trail (OCSF).

### Example

```typescript
import {
    RemediationApi,
    Configuration,
    RemediationRequest
} from '@audit-tool-monorepo/api-client';

const configuration = new Configuration();
const apiInstance = new RemediationApi(configuration);

let remediationRequest: RemediationRequest; //

const { status, data } = await apiInstance.executeRemediation(
    remediationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **remediationRequest** | **RemediationRequest**|  | |


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Action de remédiation lancée avec succès |  -  |
|**403** | Action interdite (ex: Compte Break-Glass détecté) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

