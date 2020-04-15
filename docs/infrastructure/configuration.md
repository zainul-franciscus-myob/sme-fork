# Configuration

- [Configuration](#configuration)
  - [Local configuration](#local-configuration)
    - [.env.development](#envdevelopment)
    - [config.${environment}](#configenvironment)

---

## Local configuration

Our application sources configuration via environment variables. These are specified in:
- `.env.development`
- `config.${environment}`

New configuration parameters must specified in `.env.development` and all the `config.${environment}` files.

### `.env.development`

This configuration file is used for local development.

```
REACT_APP_INTEGRATION_TYPE=Memory
REACT_APP_TELEMETRY_TYPE=NoOp
...
```

### `config.${environment}`

These configuration files are used when we build our app via `yarn react-scripts build` for the different environments.

```
REACT_APP_INTEGRATION_TYPE=AuthHttp \
REACT_APP_TELEMETRY_TYPE=Http \
...
```
