# Quakey
A cross-platform mobile app for real-time earthquake information. 
Developed using the [React Native framework](https://facebook.github.io/react-native/) with the [expo](https://expo.io/) toolchain.
Compatible with the ios and the android platform. **This project is currently under development.** 
I hope to publish this app on the Google Play Store after the UI update. 

## Things That Are Working
1. Fetching USGS earthquake data using the axios library
2. Rendering the World Map using the [react-native-maps](https://github.com/react-native-community/react-native-maps)
3. Rendering the Markers at the earthquake epicenter using the information from the USGS data
4. Fetching the GPS coordinates of the device's current location
5. Setting the initial map view to the current location

### Coming Soon...
* A new tabbed UI with the first tab dedicated to the earthquake information and the second tab for 
viewing the location of the earthquakes on a map
* A lot of UI enhancements including customized map markers and app logo
* Background earthquake data update
* A push notification mechanism when a earthquake is detected nearby

### Quick Setup
1. Download [Node.js](https://nodejs.org/)
2. Get the expo cli using ``npm install expo-cli --global``
3. Clone or download this repo
4. On your computer, navigate into the repo using the terminal
5. Run the command ``expo start``

*Note: checkout [expo](https://expo.io/) website for setup troubleshooting*
