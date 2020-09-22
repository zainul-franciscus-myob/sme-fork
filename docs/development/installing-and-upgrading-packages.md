# Installing and Upgrading Packages

NPM packages can be installed and upgraded using `yarn`. This will update our `yarn.lock`, which should be committed.

## Versions

We use exact versions:

| Example |  |
| --- | --- |
| 1.1.1 | ✅ |
| ~1.1.1 | ☢️ |
| ^1.1.1 | ☢️ |

## CI

Our pipeline uses `sme-web-buildnode`, which is a [Docker image](../../ops/buildnode/Dockerfile) that has our packages preinstalled - this helps reduce our build times.

The version used is pinned and can be found in the [`env` script](../../ops/bin/env).

In order for the build to use the latest installed/updated packages, follow these steps:

1. Build and push a new version of the image using the [`build-buildnode-image` script](../../ops/bin/build-buildnode-image).
2. Login and navigate to the [`sme-web-buildnode` versions page](https://cloudsmith.io/~myob/repos/sme-web/packages/detail/docker/sme-web-buildnode/#versions)
3. Copy the [`SHA` digest](https://success.docker.com/article/images-tagging-vs-digests) of the image with the `latest` tag as that would be the one we just pushed
4. Update the usages of `sme-web-buildnode` in:
    * [`env` script](../../ops/bin/env) for CI
    * [Dockerfile](../../ops/development/Dockerfile) for development environment
5. The pipeline should now run with the latest packages, w00t!
6. Post package update, after the PR is merged to master, update the docker image by run [build-development-image script](../../ops/bin/build-development-image).
