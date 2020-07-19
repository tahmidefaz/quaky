import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Header from './Header';
import MapContainer from './MapContainer';

const ListRoute = () => {
  return (
    <View>
      <Header title="List View" />
      <Text>Quake List</Text>
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