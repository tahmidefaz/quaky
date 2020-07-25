import React, { Component } from 'react';
import { Dimensions,StyleSheet,View } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { Marker } from 'react-native-maps';
import { mapstyle } from './mapstyle';

import { updateFeature, markerDescription, calculateDistance } from '../misc/support_functions';

const renderMarkers = (state) => {
    return state.quakeData.map(info =>
        <Marker
          coordinate={{
            latitude:  info.geometry.coordinates[1],
            longitude: info.geometry.coordinates[0],
          }}
          title={info.properties.title}
          description={
              markerDescription(info.properties.time)+" "+
              calculateDistance(info.geometry.coordinates[1],info.geometry.coordinates[0], state.currentLocation,"M")+" away"
            }
          key = {info.properties.code}
        />
    );
}

const MapContainer = () => {
    const state = useSelector(state => state);
    let mapRegion = state.currentLocation;
    return(
        <MapView
              style={styles.map}
              region={mapRegion}
              customMapStyle = {mapstyle}
              onLayout={this.onMapLayout}
              rotateEnabled={false}
              showCompass={false}>
            <View>
                {renderMarkers(state)}
            </View>
          </MapView>
    )
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