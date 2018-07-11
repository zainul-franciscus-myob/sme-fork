# SME Web Client

> This project was bootstrapped with [Create React App].

The SME Web Client is the primary frontend codebase, which implements the user interface for the SME Web product.

It is designed to work hand-in-hand with [MYOB-Technology/sme-web-bff], but is not strictly dependent on it for the purposes of local development.

## Before we begin
1. Review the [social contract] (Confluence).

1. Review the [contributions process](CONTRIBUTING.md).

1. Review the [system architecture] (Confluence).

## Contents
1. [Setting up the project](#setup)

1. [Running the tests](#run-tests)

1. [Running the local development environment](#run-local-development-environment)

1. [Running a production build](#run-a-production-build)

## Setup

1. Install [node] &mdash; **consider using [nvm]**
    > Over time it is common to need different versions of node for different projects that you work on. <br/>
    > At this stage there are no guarantees that this web client will use the same node version as the BFF.

1. Install project dependencies
    ```
    npm install
    ```



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
  - `MemoryIntegration` &mdash; default for development
  - `HTTPIntegration` &mdash; default for production

## FAQ

## Troubleshooting

[social contract]: https://myobconfluence.atlassian.net/wiki/x/7Im5Lw
[system architecture]: https://myobconfluence.atlassian.net/wiki
[Create React App]: https://github.com/facebookincubator/create-react-app
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
[MYOB-Technology/sme-web-bff]: https://github.com/MYOB-Technology/sme-web-bff
