import React, { Component } from 'react';
import { Platform, Dimensions,StyleSheet,View } from 'react-native';
import { mapstyle } from './mapstyle';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import QuakeList from './QuakeList';
import { Constants, Location, Permissions } from 'expo';

const region = {
  latitude: 37,
  longitude: -122,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class MapContainer extends Component {
    state = {
      quakes: [],
      location: null,
      errorMessage: null,
      currentLocation: region,
    };

    componentWillMount(){
      if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync();
      }
    }

    componentDidMount() {
      axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
        .then(response => this.setState({ quakes: response.data.features }));
    }

    _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this.setState({ currentLocation:{
                                    latitude:this.state.location.coords.latitude,
                                    longitude:this.state.location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                    }});

    console.log(this.state.currentLocation);
    console.log(this.state.currentTime);
    // console.log(region)
  };

  markerDescription = (quakeTime) => {
    const quakeUrl = "lol";
    console.log(quakeTime);
    diff = (Date.now() - quakeTime)/1000;
    if (diff > 3600){
      diff = (Math.round((diff/60/60)*10)/10).toString()+" hours ago";
    } else if (diff < 3600 && diff > 60){
      diff = (Math.round((diff/60)*10)/10).toString()+" minutes ago"
    } else{
      diff = (Math.round(diff*10)/10).toString()+" seconds ago"
    }
    return diff;
  };

  render() {
    // this.state.quakes.map(info => console.log(info.geometry.coordinates[1]));
    return (
      <View>
          <MapView
              style={styles.map}
              region={this.state.currentLocation}
              customMapStyle = {mapstyle}
              onLayout={this.onMapLayout}
              rotateEnabled={false}
              showCompass={false}>

          <View>
              {this.state.quakes.map(info =>
                  <Marker
                    coordinate={{
                      latitude:  info.geometry.coordinates[1],
                      longitude: info.geometry.coordinates[0],
                    }}
                    title={info.properties.title}
                    description={this.markerDescription(info.properties.time)}
                    key = {info.properties.code}
                    />
              )}
          </View>
        </MapView>
        <QuakeList currentLocation={this.state.currentLocation} list={this.state.quakes}/>
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
