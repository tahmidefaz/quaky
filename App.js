import React from 'react';
import { Platform, Dimensions, View, ScrollView,Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';
import MapContainer from './src/MapContainer';

export default class App extends React.Component {
  state = {
    quakes: [],
  };

  componentDidMount() {
    axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
      .then(response => this.setState({ quakes: response.data.features }));
  }

  markerDescription = (quakeTime) => {
    diff = (Date.now() - quakeTime)/1000;
    if (diff > 3600){
      diff = (Math.round((diff/60/60)*10)/10).toString()+" hours ago";
    } else if (diff < 3600 && diff > 60){
      diff = (Math.round((diff/60)*10)/10).toString()+" minutes ago"
    } else{
      diff = (Math.round(diff*10)/10).toString()+" seconds ago"
    }
    return diff;
  }

  renderMarkers(){
    return this.state.quakes.map(info =>
        <Marker
          coordinate={{
            latitude:  info.geometry.coordinates[1],
            longitude: info.geometry.coordinates[0],
          }}
          title={info.properties.title}
          description={this.markerDescription(info.properties.time)}
          key = {info.properties.code}
          />
    );
  }


  render() {
    return (
        <MapContainer>
          {this.renderMarkers()}
        </MapContainer>
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
