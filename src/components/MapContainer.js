import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';

import { mapstyle } from './mapstyle';
import { setMapDialogStatus, setMapRegion } from '../redux/actions';
import { markerDescription, calculateDistance, markerColor, dateParser } from '../misc/support_functions';
import QuakeDialogMap from './QuakeDialogMap';

import fault_data from '../misc/fault_data';

let updatedRegion = {};

const MapContainer = () => {
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
    dispatch(setMapRegion(currentRegion.latitude, currentRegion.longitude, currentRegion.latitudeDelta, currentRegion.longitudeDelta));
    dispatch(setMapDialogStatus(true));
  }

  const coordinate_coverter = (coordinate_array) => {
    arr = []
    coordinate_array.map((coordinate) => arr.push({latitude:coordinate[1], longitude: coordinate[0]}))
    return arr
  }

  const mapMarkerTime = (time) => {
    if (state.mapDataSource === 'search') {
      return dateParser(time);
    }
    return markerDescription(time);
  }

  let mapPointerData = 'recent';
  if (state.mapDataSource === 'search') {
    mapPointerData = state.quakeSearchData
  } else {
    mapPointerData = state.quakeData
  }

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
            {
              state.showFaultLines && fault_data.features.map((feature, index) => 
                <Polyline
                  coordinates={coordinate_coverter(feature.geometry.coordinates)}
                  strokeColor='#ffffff'
                  strokeWidth={3}
                  key={index}
                />
              )
            }
            {
              mapPointerData.map(info =>
                <Marker
                  pinColor={markerColor(info.properties.mag)}
                  coordinate={{
                    latitude:  info.geometry.coordinates[1],
                    longitude: info.geometry.coordinates[0],
                  }}
                  title={info.properties.title}
                  description={
                      "🕗 "+mapMarkerTime(info.properties.time)+" 🔺 "+
                      calculateDistance(info.geometry.coordinates[1],info.geometry.coordinates[0], state.currentLocation,"M")+" away"
                    }
                  key = {info.properties.code}
                  onCalloutPress={() => openModal(info, updatedRegion)}
                />
              )
            }
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
    }
});

export default MapContainer;