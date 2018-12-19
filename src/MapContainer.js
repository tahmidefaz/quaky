import React, { Component } from 'react';
import { Dimensions,StyleSheet,View } from 'react-native';
import { mapstyle } from './mapstyle';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import QuakeList from './QuakeList';

const region = {
  latitude: 37,
  longitude: -122,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class MapContainer extends Component {
    state = {
      quakes: []
    };

    componentDidMount() {
      axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
        .then(response => this.setState({ quakes: response.data.features }));
    }

  render() {
    // this.state.quakes.map(info => console.log(info.geometry.coordinates[1]));
    return (
      <View>
          <MapView
              style={styles.map}
              initialRegion={region}
              customMapStyle = {mapstyle}
              onLayout={this.onMapLayout}
            >
          <View>
              {this.state.quakes.map(info =>
                  <Marker
                    coordinate={{
                      latitude:  info.geometry.coordinates[1],
                      longitude: info.geometry.coordinates[0],
                    }}
                    title={info.properties.title}
                    description={info.properties.title}
                    key = {info.properties.code}
                    />
              )}
          </View>
        </MapView>
        <QuakeList list={this.state.quakes}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,122,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
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

export default MapContainer;
