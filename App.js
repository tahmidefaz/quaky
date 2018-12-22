import React from 'react';
import { Platform, Dimensions, View, ScrollView,Text } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapContainer from './src/MapContainer';

export default class App extends React.Component {
  render() {
    return (
        <MapContainer/>
    );
  }
}
