<<<<<<< HEAD
import fs from 'fs';

import Runner from 'sauce-tap-runner';
import async from 'async';
import pkg from '../../package';

function test(options, callback) {
  callback = callback || (() => {});

  if (!options) {
    throw new Error("must supply an options object");
  }

  if (!options.name) {
    throw new Error("must supply a project `name` option");
  }

  options.user = options.user || process.env.SAUCE_USERNAME
  if (!options.user) {
    throw new Error("must supply a saucelabs `user` option")
  }

  options.accessKey = options.accessKey || process.env.SAUCE_ACCESS_KEY
  if (!options.accessKey) {
    throw new Error("must supply a saucelabs `accessKey` option")
  }

  if (!options.src) {
    throw new Error("must supply a `src` file option")
  }

  if (!options.desiredCapabilities) {
    throw new Error("must supply a `desiredCapabilities` array option")
  }

  if (!options.build) {
    options.build = String(Date.now())
  }

  options.limit = options.limit || 3

  const log = options.log || console.log
  const src = fs.readFileSync(options.src, {encoding: "utf-8"})

  const tests = new Runner(options.user, options.accessKey)

  tests.on("tunnel-connect", () => log("# Starting to connect the Sauce Connect tunnel..."))
  tests.on("tunnel", (tunnel) => log("# The Sauce Connect tunnel has been connected!"))
  tests.on("tunnel-error", (e) => log("# An error occurred when connecting the Sauce Connect tunnel"))
  tests.on("browser", (browser) => log("# Successfully connected to a new browser"))
  tests.on("results", (results) => log("# Test run has finished"))
  tests.on("close", () => log("# The runner has been closed"))

  const runs = options.desiredCapabilities.map(
    (capabilities) => {
      const comboName =
        `${capabilities.platform} ${capabilities.browserName} ` +
        `${capabilities.version || "latest"}`
      capabilities = [
        ...capabilities, {
        name: `${options.name} ${comboName}`,
        "capture-html": true,
        build: options.build,}
      ]
      return (cb) => {
        log()
        log()
        log(`# Running ${comboName}...`)
        log()

        tests.run(
          src,
          capabilities,
          options.options || {},
          (err, results) => {
            if (err) {throw err}

            log()
            log()
            log(`# ${capabilities.name}`)
            log()

            log(colorTap(results.raw))
            log()
=======
var Runner = require('sauce-tap-runner'),
  browserify = require('browserify'),
  async = require('async');

var tests = new Runner('custom-select', 'd5276d0e-2b8e-4088-ade3-6bdba28cdc95'),
  // Browserify is not required, can use either a string or stream of JS code
  src = "sauce-bundle.js";

async.series([run('chrome'), run('firefox')], closeTests);

function run(browser) {
    // Return a function that when called will run tests in the specified
    // browser

    return function(callback) {
        tests.run(src, { browserName: browser }, function(err, results) {
            if (err) {
                return callback(err);
            }

            console.log(results);
            callback();
        });
    };
}
>>>>>>> parent of 86078d0... Sauce Runner try

function closeTests(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Tests completed');
    }

    tests.close(function() {
        // Runner is closed
    });
}
