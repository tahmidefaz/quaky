import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { BottomNavigation } from 'react-native-paper';
import { loadQuakeData } from '../redux/actions';

import Header from './Header';
import ListItems from './ListItems';
import MapContainer from './MapContainer';


const ListRoute = (props) => {
  // { console.log("ListRoute", props.jumpTo) }
  return (
    <View>
      <Header title="Recent Earthquakes" screen="listview"/>
      <ListItems {...props} />
    </View>
  );
};


const MapRoute = () => {
  return (
    <View>
      <Header title="Map View" screen="mapview"/>
      <MapContainer/>
    </View>
  );
};

const AppNav = () => {
  const [index, setIndex] = React.useState(0);

  // Load Earthquake Data
  const dispatch = useDispatch();
  const getQuakeData = () => dispatch(loadQuakeData());
  useEffect(() => {
    async function quakeDataAction() {
      getQuakeData();
    }
    quakeDataAction();
  },[]);

  const [routes] = React.useState([
    { key: 'listview', title: 'Quakes', icon: 'format-line-weight' },
    { key: 'mapview', title: 'Map View', icon: 'map' },
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
  