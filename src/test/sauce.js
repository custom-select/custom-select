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
