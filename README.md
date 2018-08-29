# SME Web Client

> This project was bootstrapped with [Create React App].

The SME Web Client is the primary frontend codebase, which implements the user interface for the SME Web product.

It is designed to work hand-in-hand with [MYOB-Technology/sme-web-bff], but is not strictly dependent on it for the purposes of local development.

## Before we begin

1.  Review the [social contract](Confluence).

2.  Review the [contributions process](CONTRIBUTING.md).

3.  Review the [system architecture](Confluence).

## Contents

1.  [Setting up the project](#setup)

2.  [Running the tests](#run-tests)

3.  [Running the local development environment](#run-local-development-environment)

4.  [Running a production build](#run-a-production-build)

5.  [Usage of the MemoryIntegration](#usage-of-the-memoryintegration)

## Setup

1.  Install [node] — **consider using [nvm]**

    > Over time it is common to need different versions of node for different projects that you work on. <br/>
    > At this stage there are no guarantees that this web client will use the same node version as the BFF.

2.  Install project dependencies
        npm install

### Code editors

For consistent code style, ensure your editor supports:

-   [editorconfig](http://editorconfig.org/#download).
-   [ESLint](http://eslint.org/docs/user-guide/integrations#editors) plugin installed and enabled for live linting Javascript
-   [stylelint](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/complementary-tools.md#editor-plugins) plugin installed and enabled for live linting CSS

## Run tests

```sh
./ops/bin/test # npm run test
```

**with code coverage:**

```sh
./ops/bin/coverage # npm run test -- --coverage
```

> :hand: We consider code coverage to be a _very soft_ indicator of quality, so there are no specific thresholds configured at this stage.

## Run local development environment

```sh
./ops/bin/local # npm run start
```

**Environment configuration:**<br/>
  By default, we use `.env.development` for _development_ environments.<br/>

> :thought_balloon: Local development should **never require running `sme-web-bff`**.<br/>
> :partly_sunny: Local development should be **offline capable** (stub data provided).

  You can also configure `.env.development.local`, which has been added to `.gitignore` for safety.<br/>

  Refer to the list of [supported environment variables](#environment-variables) for more detail.

## Run a production build

```sh
./ops/bin/build # npm run build
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

The `MemoryIntegration` is used in local development to stub out back-end server interaction. This makes it possible to run and test the web UI stand-alone (without any back-end server or HTTP calls). The `MemoryIntegration` uses a set of mappings to delegate intent requests to functions. All mappings that the `MemoryIntegration` is using are defined in the `rootMapper.js` file.

### Adding a new mapping with data

1.  Put your JSON data files in `src/integration/data`.
2.  Create your new mapping file in `src/integration/memoryMapping`.
3.  Import and assign your new mapping in the `rootMapper.js` file.

> ❗️ An intent can only be assigned to one function. If multiple mappings use the same intent Symbol and are assigned in the `rootMapper.js` file, then the latest one assigned in `rootMapper` will be used by the `MemoryIntegration`.

## Linting

We use:

-   [eslint] to lint javascript files with airbnb rules
-   [stylelint] to lint css files with [standard config](https://github.com/stylelint/stylelint-config-standard)

### Scripts

-   Run eslint

```sh
npm run lint:js
```

-   Run eslint and fix autofixable issues

```sh
npm run lint:js:fix
```

-   Run stylelint

```sh
npm run lint:css
```

-   Run stylelint and fix autofixable issues

```sh
npm run lint:css:fix
```

## FAQ

## Troubleshooting

[social contract]: https://myobconfluence.atlassian.net/wiki/x/7Im5Lw

[system architecture]: https://myobconfluence.atlassian.net/wiki

[create react app]: https://github.com/facebookincubator/create-react-app

[node]: https://nodejs.org/en/

[nvm]: https://github.com/creationix/nvm

[myob-technology/sme-web-bff]: https://github.com/MYOB-Technology/sme-web-bff
