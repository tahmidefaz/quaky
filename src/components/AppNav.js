import * as React from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import * as actionCreators from "../actions/index";
import { bindActionCreators } from "redux";
import { BottomNavigation, Text } from 'react-native-paper';
import Header from './Header';
import ListItems from './ListItems';
import MapContainer from './MapContainer';

const ListRoute = (props) => {
  return (
    <View>
      <Header title="List View" />
      {/* <Text>Quake List</Text> */}
      <ListItems handleDataRefresh={props.loadQuakeData} quakeData={props.data}/>
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

const mapStateToProps=(state)=>{
  return state
};

// const ActionCreators = Object.assign(
//   {},
//   changeCount,
// );
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

export default connect (mapStateToProps, actionCreators) (AppNav);
