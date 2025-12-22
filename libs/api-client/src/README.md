## @audit-tool-monorepo/api-client@1.0.0

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install @audit-tool-monorepo/api-client@1.0.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to *http://localhost:3000/api/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AuditApi* | [**getAuditReport**](docs/AuditApi.md#getauditreport) | **GET** /audits/{jobId}/report | Récupérer les résultats détaillés (SARIF)
*AuditApi* | [**getAuditStatus**](docs/AuditApi.md#getauditstatus) | **GET** /audits/{jobId}/status | Vérifier l\&#39;état d\&#39;un scan en cours
*AuditApi* | [**startAudit**](docs/AuditApi.md#startaudit) | **POST** /audits | Lancer un nouveau scan de sécurité
*ComplianceApi* | [**getNis2Score**](docs/ComplianceApi.md#getnis2score) | **GET** /compliance/nis2/score | Obtenir le score NIS 2 actuel
*RemediationApi* | [**executeRemediation**](docs/RemediationApi.md#executeremediation) | **POST** /remediations | Appliquer un correctif de sécurité


### Documentation For Models

 - [AuditFinding](docs/AuditFinding.md)
 - [AuditFindingLocationsInner](docs/AuditFindingLocationsInner.md)
 - [AuditFindingLocationsInnerPhysicalLocation](docs/AuditFindingLocationsInnerPhysicalLocation.md)
 - [AuditFindingLocationsInnerPhysicalLocationArtifactLocation](docs/AuditFindingLocationsInnerPhysicalLocationArtifactLocation.md)
 - [AuditFindingMessage](docs/AuditFindingMessage.md)
 - [AuditJobResponse](docs/AuditJobResponse.md)
 - [Nis2ScoreResponse](docs/Nis2ScoreResponse.md)
 - [Nis2ScoreResponseBreakdown](docs/Nis2ScoreResponseBreakdown.md)
 - [RemediationRequest](docs/RemediationRequest.md)
 - [SarifReport](docs/SarifReport.md)
 - [SarifReportRunsInner](docs/SarifReportRunsInner.md)
 - [SarifReportRunsInnerTool](docs/SarifReportRunsInnerTool.md)
 - [SarifReportRunsInnerToolDriver](docs/SarifReportRunsInnerToolDriver.md)
 - [StartAuditRequest](docs/StartAuditRequest.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="bearerAuth"></a>
### bearerAuth

- **Type**: Bearer authentication (JWT)

