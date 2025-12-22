# AuditApi

All URIs are relative to *http://localhost:3000/api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAuditReport**](#getauditreport) | **GET** /audits/{jobId}/report | Récupérer les résultats détaillés (SARIF)|
|[**getAuditStatus**](#getauditstatus) | **GET** /audits/{jobId}/status | Vérifier l\&#39;état d\&#39;un scan en cours|
|[**startAudit**](#startaudit) | **POST** /audits | Lancer un nouveau scan de sécurité|

# **getAuditReport**
> SarifReport getAuditReport()

Retourne le JSON standardisé contenant toutes les vulnérabilités trouvées.

### Example

```typescript
import {
    AuditApi,
    Configuration
} from '@audit-tool-monorepo/api-client';

const configuration = new Configuration();
const apiInstance = new AuditApi(configuration);

let jobId: string; // (default to undefined)

const { status, data } = await apiInstance.getAuditReport(
    jobId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **jobId** | [**string**] |  | defaults to undefined|


### Return type

**SarifReport**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Rapport complet |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAuditStatus**
> AuditJobResponse getAuditStatus()


### Example

```typescript
import {
    AuditApi,
    Configuration
} from '@audit-tool-monorepo/api-client';

const configuration = new Configuration();
const apiInstance = new AuditApi(configuration);

let jobId: string; // (default to undefined)

const { status, data } = await apiInstance.getAuditStatus(
    jobId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **jobId** | [**string**] |  | defaults to undefined|


### Return type

**AuditJobResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Statut actuel |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **startAudit**
> AuditJobResponse startAudit(startAuditRequest)


### Example

```typescript
import {
    AuditApi,
    Configuration,
    StartAuditRequest
} from '@audit-tool-monorepo/api-client';

const configuration = new Configuration();
const apiInstance = new AuditApi(configuration);

let startAuditRequest: StartAuditRequest; //

const { status, data } = await apiInstance.startAudit(
    startAuditRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startAuditRequest** | **StartAuditRequest**|  | |


### Return type

**AuditJobResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**202** | Scan accepté et mis en file d\&#39;attente (Asynchrone) |  -  |
|**401** | Non autorisé |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

