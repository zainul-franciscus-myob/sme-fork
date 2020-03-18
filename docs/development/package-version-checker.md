# Package Version Checker

This is used to audit packages being used in sme-web and sme-web-bff and find out which packages are out of date. And then, generate an alert in a Slack channel. It is at discretion of the team to decide which packages they want to update and when.

The Package Version Checker has 3 components:
* [Bash script](#bash-script)
* [Buildkite pipeline](#buildkite-pipeline)
* [Slack app](#slack-app)

## Bash script
The bash script can be found at [/ops/bin/package-version-check](https://github.com/MYOB-Technology/sme-web/blob/master/ops/bin/package-version-check)

This script: 
* runs a docker container which runs `yarn outdated` to determine which packages are outdated
* sends a message to a Slack Webhook


## Buildkite pipeline
There are two build pipelines: 
* [sme-web-package-version-check](https://buildkite.com/myob/sme-web-package-version-check)
* [sme-web-bff-package-version-check](https://buildkite.com/myob/sme-web-bff-package-version-check)

### Schedule
A cron job controls how frequently the script is run and alerts are sent to Slack.

### Slack webhook as environment variable
The slack webhook is stored as an environment variable in the pipelines. The webhook posts messages to the Slack channel.


## Slack app

### Slack channel for alerts
Package Version Checker is a slack app that allows writing to a specified slack channel. If the channel needs to be changed, it will have to be through this app.

### Slack webhook
The webhook is provided by this app. More webhooks can also be generated for different channels.

### Collaborators
Collaborators have to be manually added to this app.
