# Configuration

- [Configuration](#configuration)
  - [Local configuration](#local-configuration)
  - [What is each configuration?](#what-is-each-configuration)
    - [config.${environment}](#configenvironment)
    - [public/config-${environment}](#publicconfig-environment)
    - [.env.development](#envdevelopment)
  - [Why do we have public/config-${environment}?](#why-do-we-have-publicconfig-environment)

---

## Local configuration

We have the following configuration files:
- `config.${environment}` 
- `public/config-${environment}`
- `.env.development`

> For creating new configuration files see: [environment configuration](/README.md#build-sme-web)

---

## What is each configuration?

### `config.${environment}`

These configuration files are used to define environment variables which are then accessible to the application during runtime. E.g.

```
REACT_APP_INTEGRATION_TYPE=${REACT_APP_INTEGRATION_TYPE:=AuthHttp}
REACT_APP_TELEMETRY_TYPE=${REACT_APP_TELEMETRY_TYPE:=Http}
```

> We use environment variables to define the way in which our application communicates with external sources (`AuthHttp` vs `Http` vs `Memory/NoOp`).


### `public/config-${environment}`

These configuration files are used to define static data specific to an environment. E.g.

```
{
  "AUTHENTICATION_AUTHORITY": "https://sit.login.myob.com",
  "BFF_BASE_URL": "https://development-sme-web-bff.svc.platform.myobdev.com",
  "MY_MYOB_AU_URL": "https://sit.my.myob.com.au",
}
```

This configuration is made accessible in a different manner than our environment variables. During the react build process, we bundle along these configuration files and deploy it to the relevant S3 bucket. When the application runs, it then makes a fetch request to retrieve the associated configuration file *(based on the buildkite build number).*

### `.env.development`

This configuration file was created to allow for local development on Windows machines. It contains the same environment variables as `config-dev`.

---


## Why do we have `public/config-${environment}`?

This confluence document explains the intention behind the configuration and what it aims to achieve:

https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/862421614/Immutable+Infrastructure+and+environment+agnostic+builds

> Further documentation on how this approach extends to the platform:
> https://myobconfluence.atlassian.net/wiki/spaces/~Jason.Dwyer/pages/1026493944/SME+Platform+-+Continuous+Delivery+and+Interim+desktop+compatibility
