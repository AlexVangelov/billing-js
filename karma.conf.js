// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

module.exports = function (config) {
  config.set({

    frameworks: ["jasmine", "karma-typescript"],

    files: [
      { pattern: "src/**/*.ts" }
    ],

    preprocessors: {
      "**/*.ts": ["karma-typescript", "coverage"]
    },

    reporters: ["dots", "karma-typescript", "coverage"],

    browsers: ["PhantomJS"],
    
    singleRun: true,

    coverageReporter: {
      type: "text-summary"
    }

  });
};
