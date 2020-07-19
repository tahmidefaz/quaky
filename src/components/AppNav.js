import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import MapContainer from './MapContainer';

const ListRoute = () => <Text>Quake List</Text>;

const MapRoute = () => <MapContainer/>;

const AppNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'listview', title: 'List', icon: 'watermark' },
    { key: 'mapview', title: 'Map', icon: 'warehouse' },
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