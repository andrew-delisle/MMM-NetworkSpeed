# MMM-NetworkSpeed

- A MagicMirror module that performs a network speed test and displays the results on your MagicMirror screen. It shows your ping time, download speed, and upload speed at regular intervals, with options for customization.
- This module was created based on my usage of https://github.com/slametps/MMM-NetworkConnection and created with ChatGPT and my testing.

## Features
- Displays network speed information including:
  - Ping (latency)
  - Download speed
  - Upload speed
- The results are displayed with icons for ping, download, and upload speeds.
- Customizable update interval (default is 1 hour).
- Shows results in Mbps for download/upload and in milliseconds for ping.

## Screenshots

![image](https://github.com/user-attachments/assets/af6b6815-5cd1-4a86-9269-0e952577f736)

  
## Dependencies

This module depends on the following packages:

    speedtest-cli (for testing network speed)
    node-fetch (for making HTTP requests)

### Optional: Install speedtest-cli globally if not already installed

          sudo npm install -g speedtest-cli

## Installation

    1. Navigate to your MagicMirror's `modules` folder:  cd ~/MagicMirror/modules

    2. Clone the repository:  git clone https://github.com/andrew-delisle/MMM-NetworkSpeed.git

    3. Navigate to the newly created MMM-NetworkSpeed directory:  cd MMM-NetworkSpeed

    4. Install required dependencies:  npm install

### Configure config.js

    In your config.js file, add the module to your list of modules:
    
        {
          module: 'MMM-NetworkSpeed',
          position: 'bottom_bar', // Position on the screen
          config: {
            runInterval: 30 * 60 * 1000,  // Run speed test every 30 minutes (or set your preferred interval in ms)          }
        }

## Configuration Settings

1. runInterval: Interval for running the speed test (Default is 30mins).


## License

This project is licensed under the MIT License - see the LICENSE file for details.
