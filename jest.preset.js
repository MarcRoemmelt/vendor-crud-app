const nxPreset = require('@nrwl/jest/preset');

module.exports = { ...nxPreset, testMatch: ['**/+(*.)+(e2e-spec|e2e-test|spec|test).+(ts|js)?(x)'] };
