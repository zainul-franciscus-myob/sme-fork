# Getting Started

Please make sure you have set up your [development environment](development-environment.md) first.

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
