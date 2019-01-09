import React, { Component } from 'react';
import { Platform, Dimensions,StyleSheet,View, ScrollView, Text } from 'react-native';
import { mapstyle } from './mapstyle';
import MapView, { Callout } from 'react-native-maps';
// import QuakeInfo from './QuakeInfo';
import { Constants, Location, Permissions } from 'expo';

const region = {
  latitude: 37,
  longitude: -122,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

class MapContainer extends Component {
    state = {
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
        // console.log(region)
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
              {this.props.children}
          </View>
        </MapView>
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
  }
});

export default MapContainer;
