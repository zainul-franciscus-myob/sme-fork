
[![Build status](https://badge.buildkite.com/136ac15e403f9d3be9d1dd3910781e553a17a63b4c44866346.svg?branch=master)](https://buildkite.com/myob/sme-web)

The SME Web Client is the primary frontend codebase, which implements the user interface for the SME Web product

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
  * [Running tests](#run-tests)
  * [Running locally](#run-locally)
  * [Build SME Web](#build-sme-web)
  * [Deploy SME Web](#run-a-deploy)
  * [Environment](#run-a-production-build)
    * [Integrations](#usage-of-the-memoryintegration)
  * [General information](#general-information)
    * [Wrapped Feelix components](#wrapped-feelix-components)

## Setup

1.  Install [node] — **consider using [nvm]**

    > Over time it is common to need different versions of node for different projects that you work on. <br/>
    > At this stage there are no guarantees that this web client will use the same node version as the BFF.

2.  Install project dependencies
        yarn install

## Run tests

```sh
./ops/bin/test # yarn test --coverage
```

## Run locally

```sh
./ops/bin/start # yarn start
```

## Build sme web

```sh
./ops/bin/build
```

**Environment configuration:**<br/>
  We use the `config.prod` in the project root by default for a build.
  This will cause the `public/config-prod.json` to be included in the build output as the application configuration.

  You can create any configuration you like by adding the corresponding files

  - Application Config : `touch public/config-foo.json`
  - Environment : `touch config.foo`

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

## General Information

### Wrapped Feelix Components

In the location `src/components/Feelix/**` there are a number of wrapped components that should be favoured for use over the Feelix counterpart. These include additional behaviours and bugfixes on top of the base components.


[social contract]: https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/800688620/Web+Stream+Social+Contract
[contributions process]: CONTRIBUTING.md
[system architecture]: https://myobconfluence.atlassian.net/wiki/spaces/SA/pages/815661633/Working+on+SME-web
[Editors]: docs/linting-and-styles.md#code-editors
[Linting]: docs/linting-and-styles.md#linting
[create react app]: https://github.com/facebookincubator/create-react-app
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
[myob-technology/sme-web-bff]: https://github.com/MYOB-Technology/sme-web-bff
