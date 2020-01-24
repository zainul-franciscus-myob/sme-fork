### Reports

---

### Existing Reports documentations
[Reporting Architecture](https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/945100222/Propel+Reporting+Architecture+Update+-+April+2019)

[Reports integration to SLW stack analysis](https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/964070826/Propel+Reports+Integration+Analysis)

---

### Background

Currently, the **Reports** feature on the Navigation bar takes the user out into a different web app. This app is separate from the `sme-web` app, and has its own `bff`. Propel is the team (outside of MYOB) which works on this Reports app. 

The reason why Reports was built by a third-party team is due to time constraint to build such a complex and large system to meet our release goal.

---

### Things to note for `sme-web` and `sme-web-bff` developers

If you are working on a feature that is cross-cutting (e.g. telemetry, tracing, subscription, anything to do with the Navigation bar, etc.), most likely Propel will have to implement the same thing on their app to ensure of user's consistent experience when switching between Reports and SLW. 

* This might result in cross communication with Propel to make sure the end behaviour is the same for user visiting both Reports and SLW.
  
* So far, Propel has been copying our implementation of these cross-cutting or common features. Some features have been marked as out of scope for GA (See above Architecture document) and hence are missing from the Propel reports app (e.g. segment). 
  - An example of Propel duplicating our implementation for the Navigation Bar: [Consistent navigation experience between Reports and SLW](https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/992586145/Consistent+navigation+experience+between+MyReports+and+SME-Web)
