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
stack.json
/params
   |_ prod.json
   |_ qa.json
   |_ etc

```

### Deploy

1. Locally from your machine, `auth-myob` yourself to `core-accounting`.
2. From root of the repo,

`$ ./aws/deploy-stack < prod | qa | etc> `

#### New Stacks
If you want to deploy a new stack, perhaps for temporarily for demonstration, make a new `xxx-params.json`.

1. `$ vim aws/params/EXAMPLE-params.json`

Add required fields
```
[
  {
    "ParameterKey": "BucketName",
    "ParameterValue": "myob-sme-web-ui-EXAMPLE-bucket"
  }
]
```

2. `$ ./aws/deploy-stack EXAMPLE`
