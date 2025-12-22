# ComplianceApi

All URIs are relative to *http://localhost:3000/api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getNis2Score**](#getnis2score) | **GET** /compliance/nis2/score | Obtenir le score NIS 2 actuel|

# **getNis2Score**
> Nis2ScoreResponse getNis2Score()

Calcule le score basé sur le dernier audit valide.

### Example

```typescript
import {
    ComplianceApi,
    Configuration
} from '@audit-tool-monorepo/api-client';

const configuration = new Configuration();
const apiInstance = new ComplianceApi(configuration);

let tenantId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getNis2Score(
    tenantId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tenantId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Nis2ScoreResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Score calculé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

