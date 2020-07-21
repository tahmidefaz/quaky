import * as React from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import { loadQuakeData } from "../actions";
import { bindActionCreators } from "redux";
import { BottomNavigation, Text } from 'react-native-paper';
import Header from './Header';
import ListItems from './ListItems';
import MapView from './MapView';
// import MapContainer from './MapContainer';


class AppNav extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'listView', title: 'List', icon: 'format-list-bulleted' },
      { key: 'mapView', title: 'Map', icon: 'map' },
    ],
  };
  
  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    listview: ListItems,
    mapview: MapView,
  });

  quakeDataLoad = () => {
    let { actions } = this.props;
    actions.loadQuakeData();
  }

  // ListRoute() {
  //   return (
  //     <View>
  //       <Header title="List View" />
  //       <Text>{ quakeDataLoad() }</Text>
  //       <ListItems handleDataRefresh={this.props.loadQuakeData} quakeData={this.props.data}/>
  //     </View>
  //   );
  // }
  
  // MapRoute() {
  //   return (
  //     <View>
  //       <Header title="Map View" />
  //       <MapContainer/>
  //     </View>
  //   );
  // }

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
};


const mapStateToProps = state => ({
  quakeData: state.quakeData,
});

const ActionCreators = Object.assign(
  {},
  loadQuakeData,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect (mapStateToProps, mapDispatchToProps) (AppNav);
