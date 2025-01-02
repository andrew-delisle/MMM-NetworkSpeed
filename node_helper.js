const NodeHelper = require("node_helper");
const exec = require("child_process").exec;

module.exports = NodeHelper.create({
    start: function () {
        console.log("Starting the Network Speed Test helper");
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'GET_SPEED') {
            this.runSpeedTest();
        }
    },

    runSpeedTest: function () {
        var self = this;
        console.log("Running speed test...");

        // Run the speedtest-cli command
        exec("speedtest-cli --json", function (error, stdout, stderr) {
            if (error) {
                console.error("Error running speedtest-cli:", error);
                self.sendSocketNotification('SPEED_TEST_RESULTS', {
                    ping: 'N/A',
                    download: 'N/A',
                    upload: 'N/A'
                });
                return;
            }

            try {
                const result = JSON.parse(stdout);

                // Check if all the necessary values are present
                if (result.ping !== undefined && result.download !== undefined && result.upload !== undefined) {
                    console.log("Speed Test Results:", result);

                    // Send results to the front-end
                    self.sendSocketNotification('SPEED_TEST_RESULTS', {
                        ping: result.ping,
                        download: result.download,
                        upload: result.upload
                    });
                } else {
                    // If any of the values are missing, send 'N/A' for all fields
                    console.error("Incomplete speedtest-cli result:", result);
                    self.sendSocketNotification('SPEED_TEST_RESULTS', {
                        ping: 'N/A',
                        download: 'N/A',
                        upload: 'N/A'
                    });
                }
            } catch (e) {
                console.error("Error parsing speedtest-cli result:", e);
                self.sendSocketNotification('SPEED_TEST_RESULTS', {
                    ping: 'N/A',
                    download: 'N/A',
                    upload: 'N/A'
                });
            }
        });
    }
});
