import React, { Component } from 'react';
import { Platform, Dimensions,StyleSheet,View, ScrollView, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { mapstyle } from './mapstyle';
import MapView, { Callout } from 'react-native-maps';
import axios from 'axios';
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

    // componentDidMount(){
    //   if (Platform.OS === 'android' && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //     });
    //   } else {
    //     this._getLocationAsync();
    //   }
    // }

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
  };

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

  calculateDistance = (lat1, lon1, unit) => {
    var lat2 = this.state.currentLocation.latitude;
    var lon2 = this.state.currentLocation.longitude;
    if ((lat1 == lat2) && (lon1 == lon2)) {
  		return 0;
  	}
  	else {
  		var radlat1 = Math.PI * lat1/180;
  		var radlat2 = Math.PI * lat2/180;
  		var theta = lon1-lon2;
  		var radtheta = Math.PI * theta/180;
  		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  		if (dist > 1) {
  			dist = 1;
  		}
  		dist = Math.acos(dist);
  		dist = dist * 180/Math.PI;
  		dist = dist * 60 * 1.1515;
  		if (unit=="K") { dist = dist * 1.609344 }
  		if (unit=="N") { dist = dist * 0.8684 }
      return(dist.toFixed(2) + " miles away");
  	}
  }


  renderMarkers(){
    return this.state.quakes.map(info =>
        <Marker
          coordinate={{
            latitude:  info.geometry.coordinates[1],
            longitude: info.geometry.coordinates[0],
          }}
          title={info.properties.title}
          description={this.markerDescription(info.properties.time)+" "+this.calculateDistance(info.geometry.coordinates[1],info.geometry.coordinates[0],"M")}
          key = {info.properties.code}
        />
    );
  }

  showinfo(){
    this.state.quakes.map(info =>
      this.calculateDistance(info.geometry.coordinates[1],info.geometry.coordinates[0],"M")
    );
  }

  render() {
    return (
          <MapView
              style={styles.map}
              region={this.state.currentLocation}
              customMapStyle = {mapstyle}
              onLayout={this.onMapLayout}
              rotateEnabled={false}
              showCompass={false}>
            <View>
                {this.renderMarkers()}
            </View>
          </MapView>
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
  }
});

export default MapContainer;
