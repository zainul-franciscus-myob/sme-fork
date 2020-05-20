# Development Environment
There are two ways to set up an environment for development. 

## Dedicated development environment (preferred)
Following the approach as describe [here](https://github.com/MYOB-Technology/sme-dev).
This environment has everything preinstalled including `node_modules` which ensures consistency for all developers.
This means you don't need to run `yarn install` if you are using this development environment.

### Prerequisite
The development environment for this project requires the following to be set up:

- [Docker](https://www.docker.com)
- [Vagrant](https://www.vagrantup.com)

If the host machine is Windows, there are some additional settings to enable which is to share the drive on which the code lives on.
Comprehensive instructions can be found [here](https://github.com/MYOB-Technology/sme-dev/blob/master/docs/setup-docker-windows.md).

We need to login to the private Docker repository in Cloudsmith at [`docker.myob.com/sme-web`](https://cloudsmith.io/~myob/repos/sme-web/packages/).

1. Ask [`#tr-platform-enable`](https://myob.slack.com/archives/C3F2M5NFP) for access to the private repository
1. Login to the repository
    ```sh
    docker login docker.myob.com
    ```
   * `username` will be your `cloudsmith.io` username
   * `password` will be your [`cloudsmith.io` api key](https://cloudsmith.io/user/settings/api/) - **Please treat your API Key like your password**.

### Usage

- To stand up the development environment run the following in the host machine's terminal or Powershell:
```sh
vagrant up
```

- To access the development environment run the following in the host machine's terminal or Powershell:
```sh
vagrant ssh
```

- To exit the development environment run the following inside the development environment:
```sh
exit
```

- To restart the development environment run the following in host machine's terminal or Powershell:
```sh
vagrant reload
```

- To stop the development environment run the following in the host machine's terminal or Powershell:
```sh
vagrant halt
```

- To destroy the development environment run the following in the host machine's terminal or Powershell:
```sh
vagrant destroy
```

## Local
Install all the dependencies and tools locally.

### Dependencies
We need to login to the private registry located at [`https://npm.myob.com/npm/`](https://npm.myob.com/npm/) before installing our dependencies.

1. Ask [`#tr-platform-enable`](https://myob.slack.com/archives/C3F2M5NFP) for access to the private registry
1. Login to the registry
    ```sh
    npm login --registry=https://npm.myob.com/npm/ --scope=@myob --always-auth
    ```
    * `username` will be your `cloudsmith.io` username
    * `password` will be your [`cloudsmith.io` api key](https://cloudsmith.io/user/settings/api/) - **Please treat your API Key like your password**.
    * `email` should be your `@myob.com` email
1. After logging in, an `.npmrc` will be generated in your `$HOME` directory
    ```bash
    cat ~/.npmrc
    ```
    It should have the following two lines:

    ```txt
    @myob:registry=https://npm.myob.com/npm/
    //npm.myob.com/npm/:_authToken=YOUR_TOKEN
    ```
    * Ensure `@myob` resolves to `https://npm.myob.com/npm/` and there are no conflicting rules

    If it does not have the following - delete the `.npmrc` file and login to the registry again.
1. Install packages
    ```sh
    yarn install
    ```

For a more detailed `cloudsmith.io` setup, refer to [NPM setup](https://cloudsmith.io/~myob/repos/npm/setup/#formats-npm)

### Environment

We need `node` and `yarn` to install and run our project. The specific version for each can be found in the `engines` block in `package.json`.

1. Install [Node Version Manager](https://github.com/nvm-sh/nvm) 
1. Install correct version `node`

  ```sh
  nvm use
  ```
1. Install [`yarn`](https://yarnpkg.com/)

  ```sh
  npm install -g yarn
  ```

