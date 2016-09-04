module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine', 'karma-typescript'],

    files: [
      { pattern: "lib/**/*.ts" }
    ],

    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  };

  config.set(_config);
};
