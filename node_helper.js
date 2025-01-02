const NodeHelper = require("node_helper");
const exec = require("child_process").exec;

module.exports = NodeHelper.create({
    start: function () {
        console.log("Starting the Network Speed Test helper");
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'GET_SPEED') {
            this.runSpeedTest(payload);
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
                console.log("Speed Test Results:", result);

                // Send results to the front-end
                self.sendSocketNotification('SPEED_TEST_RESULTS', {
                    ping: result.ping,
                    download: result.download,
                    upload: result.upload
                });
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
