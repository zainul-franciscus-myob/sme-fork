### /aws

We strive to keep all infrastructure immutable. Nothing is precious.
Recovery should be as simple as doing a complete Pheonix Deployment of our infrastructure, and triggering a build in CI.

* [Cloudformation](#cloudformation)
* [Deploy Scripts](#deploy)

### Cloudformation

- A single stack for all environments/deployments.
- The core stack is parameterised, each stack variety is built using parameter files.
    - All parameter files found in `/params`
    - Naming convention of these files is _important_ as the scripts have expectations.

```
sme-web-ui-stack.json
/params
   |_ production-params.json
   |_ preview-params.json
   |_ ...etc

```

### Deploy

1. Locally from your machine, `myob-auth l` yourself to `core-accounting`.
2. From root of the repo,

`$ ./aws/deploy-stack [integration|pdv|preview|production]`

#### New Stacks
If you want to deploy a new stack, perhaps for temporarily for demonstration, make a new `xxx-params.json`.

1. `$ vim aws/params/example-params.json`

Add required fields (copy from `integration-params.json` for example)

2. `$ ./aws/deploy-stack example`
