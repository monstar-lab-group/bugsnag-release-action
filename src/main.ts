const reportBuild = require('bugsnag-build-reporter');
const core = require('@actions/core');

try {
  const apiKey = core.getInput('BUGSNAG_API_KEY') || process.env.BUGSNAG_API_KEY;
  if (!apiKey) {
    throw new Error('BUGSNAG_API_KEY is required');
  }

  const version = core.getInput('version') || process.env.GITHUB_SHA;
  const releaseStage = core.getInput('releaseStage');
  const provider = 'github';
  const repository = process.env.GITHUB_REPOSITORY;
  const builderName = core.getInput('builderName') || process.env.GITHUB_ACTOR
  const autoAssignRelease = core.getInput('autoAssignRelease') || true

  console.log(`Reporting build for version ${version}`);
  reportBuild({
    apiKey: apiKey,
    appVersion: version,
    releaseStage: releaseStage,
    sourceControl: {
      provider: provider,
      repository: repository,
      revision: version
    },
    builderName: builderName,
    autoAssignRelease: autoAssignRelease
  })
    .then(() => core.info('Build reported to Bugsnag successfully.'))
    .catch((error) => {
      throw error;
    });
} catch (error) {
  core.setFailed(error.message);
  core.warning(`bugsnag-release-action failed: ${error.message}`);
}