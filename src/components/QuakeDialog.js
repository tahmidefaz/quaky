import * as React from 'react';
import { Paragraph, Dialog, Portal, Button, Divider, Subheading, Caption, IconButton, Text, Colors } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { setDialogStatus, setMapRegion } from '../actions';
import { listItemColor } from '../misc/support_functions';

const dateParser = (timestamp) => {
  const date = new Date(timestamp);
  return date.toUTCString();
}

const QuakeDialog = (props) => {
  const state = useSelector(state => state)

  const dispatch = useDispatch();
  const hideDialog = () => {
    dispatch(setMapRegion(state.currentLocation.latitude, state.currentLocation.longitude));
    dispatch(setDialogStatus(false))
  };
  
  const goToMap = (lat, long , jumpTo) => {
    dispatch(setMapRegion(lat, long));
    jumpTo('mapview');
    dispatch(setDialogStatus(false));
  };

  const iconSize = 20;

  return (
    <Portal>
      <Dialog visible={state.isDialogOpen} onDismiss={hideDialog} style={{...styles.dialogStyle, backgroundColor: listItemColor(props.data.mag)}}>
        <Dialog.Title style={styles.headerText}>{props.data.place}</Dialog.Title>
        <Divider/>
        <Dialog.Content style={styles.body}>
          
          <View style={styles.rowStyle}>
            <View style={styles.rowIconStyle}>
              <IconButton icon="alert-circle" size={iconSize}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Magnitude</Text>
              <Caption>{ props.data.mag+" M" }</Caption>
            </View>
            <View style={styles.rowIconStyle}>
              <IconButton icon="office-building" size={iconSize}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Depth</Text>
              <Caption>{ (props.data.depth*0.623171).toFixed(2)+" miles" }</Caption>
            </View>
          </View>

          <View style={styles.rowStyle}>
            <View style={styles.rowIconStyle}>
              <IconButton icon="map-marker-radius" size={iconSize}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Location</Text>
              {/* <Caption style={styles.longTextSize}>{ props.data.place }</Caption> */}
              <Caption style={styles.longTextSize}>Location Information</Caption>
            </View>
            <View style={styles.rowIconStyle}>
              <IconButton icon="earth" size={iconSize}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Distance</Text>
              <Caption>{ props.data.distance }</Caption>
            </View>
          </View>

          <View style={styles.rowStyle}>
            <View style={styles.rowIconStyle}>
              <IconButton icon="clock" size={iconSize}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Time</Text>
              {/* <Caption style={styles.longTextSize}>{ dateParser(props.data.time) }</Caption> */}
              <Caption style={styles.longTextSize}>Placeholder Time</Caption>
            </View>
            <View style={styles.rowIconStyle}>
              <IconButton icon="web" size={iconSize}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Full Report</Text>
              <Caption style={styles.linkStyle} onPress={() => Linking.openURL(props.data.url)}>View Full Report</Caption>
              {/* { console.log("coords", props.data.latitude, props.data.longitude)} */}
            </View>
          </View>
        </Dialog.Content>
        <Divider/>
        <Dialog.Actions style={styles.actionBar}>
          <Button icon="map-plus" onPress={() => goToMap(props.data.latitude, props.data.longitude, props.jumpTo)}>View On Map</Button>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default QuakeDialog;

const styles = StyleSheet.create({
  dialogStyle: {
    backgroundColor: Colors.yellow900,
    borderRadius: 10,
  },
  headerText:{
    color: 'white'
  },
  body: {
    backgroundColor: 'white',
    paddingTop: "5%",
    paddingHorizontal:"2%"
  },
  rowStyle: {
    padding:"2%",
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  rowIconStyle:{
    flex: 1,
    paddingEnd:"5%"
  },
  rowItemStyle: {
    flex:3,
    flexWrap:'wrap'
  },
  linkStyle: {
    textDecorationLine: 'underline',
    color: 'blue'
  },
  longTextSize: {
    fontSize: 10
  },
  actionBar: {
    paddingEnd:"7%",
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }
})
