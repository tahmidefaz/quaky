import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { BottomNavigation } from 'react-native-paper';
import { loadQuakeData, loadCurrentLocation, loadTestAction } from '../actions';

import Header from './Header';
import ListItems from './ListItems';
import MapContainer from './MapContainer';


const ListRoute = (props) => {
  return (
    <View>
      <Header title="List View" />
      <ListItems />
    </View>
  );
};


const MapRoute = () => {
  return (
    <View>
      <Header title="Map View" />
      <MapContainer/>
    </View>
  );
};

const AppNav = () => {
  const [index, setIndex] = React.useState(0);

  // Load Earthquake Data
  const dispatch = useDispatch();
  const getQuakeData = () => dispatch(loadQuakeData());
  useEffect(() => getQuakeData());

  const [routes] = React.useState([
    { key: 'listview', title: 'List', icon: 'format-list-bulleted' },
    { key: 'mapview', title: 'Map', icon: 'map' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    listview: ListRoute,
    mapview: MapRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
  
export default AppNav;
  