import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View, BackHandler } from 'react-native';
import MapView from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';

import { Marker } from 'react-native-maps';
import { mapstyle } from './mapstyle';

import { setMapDialogStatus, setMapRegion } from '../actions';
import { markerDescription, calculateDistance } from '../misc/support_functions';
import QuakeDialogMap from './QuakeDialogMap';

let updatedRegion = {};

const MapContainer = (props) => {
  const state = useSelector(state => state);
  let mapRegion = state.mapRegion;

  const [selectedData, setSelectedData] = React.useState({});
  const dispatch = useDispatch();

  const regionChangeUpdate = (region) => {
    updatedRegion = {...region}
  }

  const openModal = (quakeData, currentRegion) => {
    setSelectedData({
        mag: quakeData.properties.mag.toFixed(2),
        time: quakeData.properties.time,
        url: quakeData.properties.url,
        place: quakeData.properties.place,
        longitude: quakeData.geometry.coordinates[0],
        latitude: quakeData.geometry.coordinates[1],
        depth: quakeData.geometry.coordinates[2].toFixed(2),
        distance: calculateDistance(quakeData.geometry.coordinates[1], quakeData.geometry.coordinates[0], state.currentLocation, "M")
    });
    dispatch(setMapRegion(currentRegion.latitude, currentRegion.longitude, currentRegion.latitudeDelta, currentRegion.longitudeDelta))
    dispatch(setMapDialogStatus(true));
  }

  const backAction = () => {
    props.jumpTo('listview');
    return true;
  }
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);

  return(
    <View>
      <MapView
            style={styles.map}
            region={mapRegion}
            customMapStyle = {mapstyle}
            rotateEnabled={false}
            showCompass={false}
            onRegionChangeComplete={(region) => regionChangeUpdate(region)}
            >
          <View>
              {
                state.quakeData.map(info =>
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
                    onCalloutPress={() => openModal(info, updatedRegion)}
                  />
                )
              }
          </View>
      </MapView>
      <QuakeDialogMap data={selectedData}/>
    </View>
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