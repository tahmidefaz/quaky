# Quakey
A cross-platform mobile app for real-time earthquake information. 
Developed using the [React Native framework](https://facebook.github.io/react-native/) with the [expo](https://expo.io/) toolchain.
Compatible with the ios and the android platform. **App is currently awaiting review for Play Store release.**. Quakey is currently stable **Version 1.x**

## General Information
Quakey currently has two screens. One that provides the earthquake data in list view and another that provides the data in map view. At the moment, Quakey uses the 2.5+ daily earthquakes api endpoint from USGS. This endpoint provides information on US earthquakes that are at least 2.5 in magnitude and on worlwide earthquakes that are at least 4.5 in magnitude.

Earthquakes in the list view are color coded by their severity. Green for magnitude 2.5 and up, orange for magnitude 4.5 and up, and red for magnitude 5.5 and up.

![List_View](../assets/listview.png?raw=true) ![Map_View](../assets/mapview.png?raw=true)

In addition to these, Quakey also presents the earthquake information in a modal on List View and Map View. Information such as magnitude, depth, location, distance from the user, time and link to full report are presented there. When the user taps the "View Full Report" option on the modal, the app opens up the in-app browser (Chrome Custom Tabs) and navigates to the USGS website. Quakey also lets users add a map layer to display the geographical fault lines in the map view.

![Modal](../assets/modal.png?raw=true) ![Fault Lines](../assets/fault_lines.png?raw=true)

## Features that are working
1. Fetching USGS earthquake data using the axios library
2. Rendering the World Map using the [react-native-maps](https://github.com/react-native-community/react-native-maps)
3. Rendering the Markers at the earthquake epicenter using the information from the USGS data
4. Fetching the GPS coordinates of the device's current location
5. Setting the initial map view to the current location
6. A new tabbed UI with the first tab dedicated to the earthquake information and the second tab for 
viewing the location of the earthquakes on a map
7. Updated modern user interface
8. In-app browser (Chrome Custom Tabs) to read the full earthquake report from USGS
9. Map overlay of all the geological fault lines in the world

### Features that needs to be worked on
##### For v.1.x - v.3.x
* A back button handler to list view from all screens
* Custom map markers
* A new user preferences screen for changing default units, theme, toggle fault lines etc.
* Another screen to view statistics on daily earthquakes
* A new screen to provide historical earthquake data
##### For v.4.x and up
* Background daily earthquake data update
* A push notification mechanism for when a earthquake is detected nearby

### Quick Setup
1. Download [Node.js](https://nodejs.org/)
2. Get the expo cli using ``npm install expo-cli --global``
3. Clone or download this repo
4. On your computer, navigate into the repo using the terminal
5. Rename the file ``app.example.json`` to ``app.json``
5. Run the command ``expo start``

*Note: checkout [expo](https://expo.io/) website for setup troubleshooting*
