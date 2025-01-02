Module.register("MMM-NetworkSpeed", {
    defaults: {
        runInterval: 3600000,   // Default to 1 hour (3,600,000 ms)
        animationSpeed: 1000,    // Smooth transition for data change
        displayTextStatus: true,
        language: "en",
    },

    start: function () {
        this.scheduleSpeedTest(); // Run the speed test immediately when starting
    },

    scheduleSpeedTest: function () {
        var self = this;

        // Run the first speed test immediately after MagicMirror starts
        self.sendSocketNotification('GET_SPEED', self.config);

        // Log the interval configuration
        console.log("Speed test interval: " + this.config.runInterval / 1000 + " seconds");

        // Set a recurring interval to run the speed test after the initial test
        setInterval(function () {
            self.sendSocketNotification('GET_SPEED', self.config); // Request speed test
        }, this.config.runInterval); // Repeat based on runInterval
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'SPEED_TEST_RESULTS') {
            this.updateSpeedDisplay(payload); // Update with the speed test results
        }
    },

    updateSpeedDisplay: function (data) {
        // Format the results for display
        var downloadSpeed = (data.download / 1000000).toFixed(2) + " Mbps"; // Convert to Mbps
        var uploadSpeed = (data.upload / 1000000).toFixed(2) + " Mbps"; // Convert to Mbps
        var pingTime = data.ping + " ms"; // Ping time in ms

        // Set these as the data we want to display
        this.downloadSpeed = downloadSpeed;
        this.uploadSpeed = uploadSpeed;
        this.ping = pingTime;

        // Update the DOM to reflect the changes
        this.updateDom(this.config.animationSpeed);
    },

    // Override the getDom method to render the data
    getDom: function () {
        var wrapper = document.createElement("div");

        // Always display the icons, even when there's no data
        wrapper.innerHTML = `
            <span class="fa fa-cloud"></span> ${this.ping || 'N/A'} | 
            <span class="fa fa-download"></span> ${this.downloadSpeed || 'N/A'} | 
            <span class="fa fa-upload"></span> ${this.uploadSpeed || 'N/A'}
        `;

        return wrapper;
    }
});
