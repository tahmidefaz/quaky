import React from 'react';
import { View, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
});
