# Getting Request Logs

Logs can give us the reason why a request has failed. We use [Sumo](https://myobconfluence.atlassian.net/wiki/spaces/OBSERVE/pages/855837228/Getting+started+with+Sumo+Logic) to collect and manage our logs.

## Prebuilt Queries

* [Integration](#Integration)
* [PDV](#PDV)
* [Preview](#Preview)

## Basic Query Syntax

```
// filters
_sourceCategory = /jupiter-europa-preprod/sme
AND _sourceName = *sme.integration-sme-web-bff*
AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log
| json field=k8s_log "message" as app_log
| fields app_log, k8s_log
```

* [`_sourceCategory`](https://help.sumologic.com/05Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata) filters by Kubernetes cluster

    | Environment | Cluster |
    | --- | --- |
    | Production | `/aws/ex-cluster-production` |
    | Preprod | `/jupiter-europa-preprod/sme` |
* [`_sourceName`](https://help.sumologic.com/05Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata) filters by service using regex
    * List BFF services

        ```sh
        kubectl get services -n sme | grep sme-web-bff
        # integration-sme-web-bff                         ClusterIP   10.98.190.70     <none>        80/TCP           325d
        # pdv-sme-web-bff                                 ClusterIP   10.99.25.190     <none>        80/TCP           189d
        ```
    * List Private API Gateway services

        ```sh
        kubectl get services -n sme | grep private-api-gateway
        # integration-sme-web-bff                         ClusterIP   10.98.190.70     <none>        80/TCP           325d
        # pdv-sme-web-bff                                 ClusterIP   10.99.25.190     <none>        80/TCP           189d
        ```
* `app_log` is the service log output in the format defined in the [Logging Standard](https://myobconfluence.atlassian.net/wiki/spaces/LOG/pages/209584219/Logging+Standard+v2)
* `k8s_log` is the Kubernetes log wrapper

# Need request body?

Due to [PII](https://www.oaic.gov.au/privacy/guidance-and-advice/what-is-personal-information/) concerns and the sensitive nature of the data we transmit, much of the request is not logged. This can make debugging difficult in some cases where you need to know what is being sent upstream.

## Local debugging

You can use the [local debugging](local-debugging.md) tools to start the BFF locally and replay the scenario locally, after the fact.

## Payload Logging

In `sme-web-bff`, environments with the `ALLOW_PAYLOAD_LOGGING=true` can enable logging of the Private API Gateway responses. This can be done without a code change.

1. Find the name of the `ConfigMap` and `Deployment` for the target environment (`integration`)

    ```sh
    kubectl get configmap -n sme | grep sme-web-bff-payload-logging
    # integration-sme-web-bff-payload-logging   1      42d
    ```

    ```sh
    kubectl get deployment -n sme | grep sme-web-bff
    # integration-sme-web-bff                            3/3     3            3           155d
    ```
1. Edit the config map, setting the `toggle` to `on`

    ```sh
    kubectl edit configmap integration-sme-web-bff-payload-logging -n sme
    # data:
    #   toggle: "on"
    ```
1. Cycle the pods

    ```sh
    kubectl rollout restart deployment integration-sme-web-bff -n sme
    ```

## Integration

### `sme-web-bff`

```
// filters
_sourceCategory = /jupiter-europa-preprod/sme
AND _sourceName = *sme.integration-sme-web-bff*
AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log
| json field=k8s_log "message" as app_log
| fields app_log, k8s_log
```

### Private API Gateway

```
// filters
_sourceCategory = /jupiter-europa-preprod/sme
AND _sourceName = *sme.integration-private-api-gateway*
AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log
| json field=k8s_log "message" as app_log
| fields app_log, k8s_log
```

## PDV

### `sme-web-bff`

```
// filters
_sourceCategory = /jupiter-europa-preprod/sme
AND _sourceName = *sme.pdv-sme-web-bff*
AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log
| json field=k8s_log "message" as app_log
| fields app_log, k8s_log
```

### Private API Gateway

```
// filters
_sourceCategory = /jupiter-europa-preprod/sme
AND _sourceName = *sme.pdv-private-api-gateway*
AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log
| json field=k8s_log "message" as app_log
| fields app_log, k8s_log
```

## Preview

### `sme-web-bff`

```
// filters
_sourceCategory = /aws/ex-cluster-production
AND _sourceName = *sme.preview-sme-web-bff*
AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log
| json field=k8s_log "message" as app_log
| fields app_log, k8s_log
```

### Private API Gateway

```
// filters
_sourceCategory = /aws/ex-cluster-production
AND _sourceName = *sme.preview-private-api-gateway*
AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log
| json field=k8s_log "message" as app_log
| fields app_log, k8s_log
```

## Production

### `sme-web-bff`
Order routes with frequency of errors
```
// filters
_sourceCategory = /aws/ex-cluster-production
AND _sourceName = *sme.production-sme-web-bff*
//AND filter_bank_transactions              //route (optional)


// parse k8s log
| json field=_raw "log" as k8s_log              //get log from _raw and display it as k8s_log
| json field=k8s_log "message" as app_log
| json field=app_log "statusCode" as statusCode //get statusCode from message and display as statusCode
| json field=app_log "url" as url
| replace(url, /^(\/.*?\/)/, "") as route       //remove company file GUID from url

| fields statusCode, url, route                 //fields that will be displayed

| where statusCode > 404                       

| count by route               
| sort by _count
```

Find logs for internal server errors (HTTP code 500)
```
// filters
_sourceCategory = /aws/ex-cluster-production
AND _sourceName = *sme.production-sme-web-bff*
//AND filter_bank_transactions              //route (optional)
//AND 05b6f3a3-8aae-40da-9ac3-3ce8825a319a // requestId (optional)

// parse k8s log
| json field=_raw "log" as k8s_log              //get log from _raw and display it as k8s_log
| json field=k8s_log "message" as app_log
| json field=app_log "statusCode" as statusCode //get statusCode from message and display as statusCode
| json field=app_log "url" as url

| fields app_log, k8s_log, statusCode, url      //fields that will be displayed

| where statusCode > 404
```


