
[![Build status](https://badge.buildkite.com/136ac15e403f9d3be9d1dd3910781e553a17a63b4c44866346.svg?branch=master)](https://buildkite.com/myob/sme-web)

The SME Web Client is the primary frontend codebase, which implements the user interface for the SME Web product.

> This project was bootstrapped with [Create React App].

It is designed to work hand-in-hand with [MYOB-Technology/sme-web-bff], but is not strictly dependent on it for the purposes of local development.

SME Web
=================

  * Getting Started
    * Review the [social contract].
    * Review the [contributions process].
    * Review the [system architecture].
  * [Setting up the project](#setup)
    * [Editors]
    * [Linting]
  * [Running the tests](#run-tests)
  * [Running the local development environment](#run-local-development-environment)
  * [Running a production build](#run-a-production-build)
  * [Environment](#run-a-production-build)
    * [Integrations](#usage-of-the-memoryintegration)


## Setup

1.  Install [node] — **consider using [nvm]**

    > Over time it is common to need different versions of node for different projects that you work on. <br/>
    > At this stage there are no guarantees that this web client will use the same node version as the BFF.

2.  Install project dependencies
        yarn install

## Run tests

```sh
./ops/bin/test yarn run test
```

**with code coverage:**

```sh
./ops/bin/coverage # yarn run test -- --coverage
```

> :hand: We consider code coverage to be a _very soft_ indicator of quality, so there are no specific thresholds configured at this stage.

## Run local development environment

```sh
./ops/bin/local # yarn run start
```

**Environment configuration:**<br/>
  By default, we use `.env.development` for _development_ environments.<br/>

> :thought_balloon: Local development should **never require running `sme-web-bff`**.<br/>
> :partly_sunny: Local development should be **offline capable** (stub data provided).

  You can also configure `.env.development.local`, which has been added to `.gitignore` for safety.<br/>

  Refer to the list of [supported environment variables](#environment-variables) for more detail.

## Run a production build

```sh
./ops/bin/build # yarn run build
```

**Environment configuration:**<br/>
  By default, we use `.env.production` for _production_ environments.

> :thumbsup: The default production configuration will require that [MYOB-Technology/sme-web-bff] is up and available.

  You can also configure `.env.production.local`, which has been added to `.gitignore` for safety.

  Refer to the list of [supported environment variables](#environment-variables) for more detail.

## Environment variables

#### `REACT_APP_INTEGRATION_TYPE`

  Which integration class to use.<br/>
  Integration classes are kept in the [`src/integration`](src/integration) folder.

-   `MemoryIntegration` — default for development
-   `HTTPIntegration` — default for production

## Usage of the MemoryIntegration

The `MemoryIntegration` is used in local development to stub out back-end server interaction. This makes it possible to run and test the web UI stand-alone (without any back-end server or HTTP calls). The `MemoryIntegration` uses a set of mappings to delegate intent requests to functions. All mappings that the `MemoryIntegration` is using are defined in the `RootMapping.js` file.

### Adding a new mapping with data

1.  Put your JSON data files in `src/integration/data`.
2.  Create your new mapping file in `src/integration/memoryMappings`.
3.  Import and assign your new mapping in the `RootMapping.js` file.

> ❗️ An intent can only be assigned to one function. If multiple mappings use the same intent Symbol and are assigned in the `RootMapping.js` file, then the latest one assigned in `rootMapper` will be used by the `MemoryIntegration`.


[social contract]: https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/800688620/Web+Stream+Social+Contract
[contributions process]: CONTRIBUTING.md
[system architecture]: https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/815661633/Working+on+SME-web
[Editors]: docs/linting-and-styles.md#code-editors
[Linting]: docs/linting-and-styles.md#linting
[create react app]: https://github.com/facebookincubator/create-react-app
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
[myob-technology/sme-web-bff]: https://github.com/MYOB-Technology/sme-web-bff
