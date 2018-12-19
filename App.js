import React from 'react';
import { View } from 'react-native';
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
