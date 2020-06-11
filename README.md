# Bugsnag Release Action

Report a release to Bugsnag from GitHub Actions.

## Prerequisites

* A bugsnag API Key

## Usage

Add the following to your workflow:

```
- name: Bugsnag report
  uses: ./
  with:
    releaseStage: production
  env:
    BUGSNAG_API_KEY: ${{ secrets.BUGSNAG_API_KEY }}
```

## Inputs

### `BUGSNAG_API_KEY`

**Required** Your bugsnag API Key

### `releaseStage`

The release stage of the build. The default is `production`

### `builderName`

The name provisioning the build. The default is the name triggering the build.

### `autoAssignRelease`

Flag indicating whether to automatically associate this build with any new error events and sessions that are received for the release stage. The default is `true`

### `version`

The version to add to bugsnag. The default is the Git SHA.