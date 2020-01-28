# Getting Started

## Environment

We need `node` and `yarn` to install and run our project.

1. Install [Node Version Manager](https://github.com/nvm-sh/nvm) 
1. Install correct version `node`

  ```sh
  nvm use
  ```
1. Install [`yarn`](https://yarnpkg.com/)

  ```sh
  npm install -g yarn
  ```

## Dependencies

We need to login to the private registry located at [`https://npm.myob.com/npm/`](https://npm.myob.com/npm/) before installing our dependencies.

1. Ask [`#tr-platform-enable`](https://myob.slack.com/archives/C3F2M5NFP) for access to the private registry
1. Set registry to `https://npm.myob.com/npm/`
    ```sh
    npm config set registry https://npm.myob.com/npm/
    ```
1. Login to the regsitry
    ```sh
    npm login --registry=https://npm.myob.com/npm/
    ```
    * `username` will be your `cloudsmith.io` username
    * `password` will be your [`cloudsmith.io` api key](https://cloudsmith.io/user/settings/api/)
    * `email` should be your `@myob.com` email
1. Install packages
    ```sh
    yarn install
    ```

For a more detailed `cloudsmith.io` setup, refer to [NPM setup](https://cloudsmith.io/~myob/repos/npm/setup/#formats-npm)

## Commands

This project can be run and test just like any other [`create-react-app`](https://github.com/facebook/create-react-app) project.

### Run

```sh
yarn start
```

### Test
```sh
yarn test
```

### Lint

```sh
yarn lint:js:fix
```

```sh
yarn lint:css:fix
```

## Editor

The commands should be sufficient for development in any editor. Below are some quality of life improvements for some editors.

### Visual Studio Code

The commands should enable development in any editor, but here are some settings for [Visual Studio Code](https://code.visualstudio.com/) used by the developers.

#### Linting on save

1. Install the  `dbaeumer.vscode-eslint` plugin

    ```sh
    code --install-extension dbaeumer.vscode-eslint
    ```
2. Add the following to your `settings.json`

    ```json
    "[javascript]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        },
    },
    "[javascriptreact]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
        },
    }
    ```
    Not this conflicts with `"editor.formatOnSave": true`

## Browser

The project targets the evergreen browsers: Chrome, Firefox, Edge or Safari. So development should be against one of these environments. 

As we rely heavily on [Feelix](https://feelix.myob.com/), which does their own browser compatibility testing, it should be uncommon we encounter browser specific differences 🤞. 
