# MMM-NetworkSpeed

A MagicMirror module that performs a network speed test and displays the results on your MagicMirror screen. It shows your ping time, download speed, and upload speed at regular intervals, with options for customization.

## Features
- Displays network speed information including:
  - Ping (latency)
  - Download speed
  - Upload speed
- The results are displayed with icons for ping, download, and upload speeds.
- Customizable update interval (default is 1 hour).
- Shows results in Mbps for download/upload and in milliseconds for ping.

## Screenshots

  
## Dependencies

This module depends on the following packages:

    speedtest-cli (for testing network speed)
    node-fetch (for making HTTP requests)

# Optional: Install speedtest-cli globally if not already installed

          sudo npm install -g speedtest-cli

## Installation

    1. Navigate to your MagicMirror's `modules` folder:  cd ~/MagicMirror/modules

    2. Clone the repository:  git clone https://github.com/andrew-delisle/MMM-NetworkSpeed.git

    3. Navigate to the newly created MMM-NetworkSpeed directory:  cd MMM-NetworkSpeed

    4. Install required dependencies:  npm install

## Configuration

In your config.js file, add the module to your list of modules:
    
    {
      module: 'MMM-NetworkSpeed',
      position: 'bottom_bar', // Position on the screen
      config: {
        runInterval: 60 * 60 * 1000,  // Time between tests in milliseconds (default: 1 hour)
        updateInterval: 60 * 60 * 1000, // How often to update the data on the screen (default: 1 hour)
      }
    }

## License

This project is licensed under the MIT License - see the LICENSE file for details.
