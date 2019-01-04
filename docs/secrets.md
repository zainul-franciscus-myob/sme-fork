### Secrets

Secrets should never be comitted to version control.
The web ui has relatively few secrets, given the final artefact we build is
publicly distributed.

### What secrets do we have?
 - [Build Agent: Internal NPM credentials](Build-Agent-NPM-login)
 -

### Rotation Policy

There is currently no rotation strategy for secrets.

#### Build Agent NPM login

Our build agent requires access to an internal NPM registery to pull Feelix widgets.
Your interface for this process is provided by our
[ops/bin/npm-auth](https://github.com/MYOB-Technology/sme-web/blob/master/ops/bin/npm-auth) script.
This uses the [aws secretsmanager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) to fetch
a complete `.npmrc` file for the agent to transperently pull internal node modules via `yarn install`

> :warning: This secret is manually uploaded to the respective AWS account via console, and will need to be resupplied in fresh accounts. 
