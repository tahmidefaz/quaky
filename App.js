import React from 'react';
import { Platform, Dimensions, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapContainer from './src/MapContainer';

export default class App extends React.Component {
  render() {
    return (
      <View>
          <MapContainer/>
      </View>
    );
  }
}
