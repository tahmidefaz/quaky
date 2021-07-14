import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { BottomNavigation } from 'react-native-paper';
import { loadQuakeData } from '../redux/actions';

import Header from './Header';
import ListItems from './ListItems';
import MapContainer from './MapContainer';
import SearchView from './SearchView';
import OptionsBar from './OptionsBar';



const ListRoute = (props) => {
  // { console.log("ListRoute", props.jumpTo) }
  return (
    <View>
      <Header title="Recent Earthquakes" screen="listview"/>
      <OptionsBar {...props} screen="listview"/>
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

const SearchRoute = (props) => {
  return (
    <View>
      <Header title="Search Earthquakes" screen="searchview"/>
      <SearchView {...props} />
    </View>
  )
}

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
    { key: 'listview', title: 'Recent', icon: 'format-line-weight' },
    { key: 'searchview', title: 'Search', icon: 'history'},
    { key: 'mapview', title: 'Map View', icon: 'map' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    listview: ListRoute,
    mapview: MapRoute,
    searchview: SearchRoute,
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
  