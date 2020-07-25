import * as React from 'react';
import { Paragraph, Dialog, Portal, Button, Divider, Subheading, Caption, IconButton, Text } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { setDialogStatus } from '../actions';

const dateParser = (timestamp) => {
  const date = new Date(timestamp);
  return date.toUTCString();
}

const QuakeDialog = (props) => {
  const state = useSelector(state => state)

  const dispatch = useDispatch();
  const hideDialog = () => dispatch(setDialogStatus(false));
  // console.log(state.selected_feature)
  return (
    <Portal>
      <Dialog visible={state.isDialogOpen} onDismiss={hideDialog} style={styles.header}>
        <Dialog.Title>Earthquake Information</Dialog.Title>
        <Divider/>
        <Dialog.Content style={styles.body}>
          
          <View style={styles.rowStyle}>
            <View style={styles.rowIconStyle}>
              <IconButton icon="alert-circle" size={20}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Magnitude</Text>
              <Caption>{ props.data.mag+" M" }</Caption>
            </View>
            <View style={styles.rowIconStyle}>
              <IconButton icon="map" size={15}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Depth</Text>
              <Caption>{ props.data.depth+" km" }</Caption>
            </View>
          </View>

          <View style={styles.rowStyle}>
            <View style={styles.rowIconStyle}>
              <IconButton icon="map" size={15}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Place</Text>
              {/* <Caption>{ props.data.place }</Caption> */}
              <Caption>Location Info</Caption>
            </View>
            <View style={styles.rowIconStyle}>
              <IconButton icon="map" size={15}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Time</Text>
              {/* <Caption style={{flexWrap:'wrap'}}>{ dateParser(props.data.time) }</Caption> */}
              <Caption style={{flexWrap:'wrap'}}>Placeholder</Caption>
            </View>
          </View>

          <View style={styles.rowStyle}>
            <View style={styles.rowIconStyle}>
              <IconButton icon="map" size={15}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Distance</Text>
              <Caption>{ props.data.distance }</Caption>
            </View>
            <View style={styles.rowIconStyle}>
              <IconButton icon="map" size={15}/>
            </View>
            <View style={styles.rowItemStyle}>
              <Text>Full Report</Text>
              <Caption style={styles.linkStyle} onPress={() => Linking.openURL(props.data.url)}>View Full Report</Caption>
              { console.log("coords", props.data.latitude, props.data.longitude)}
            </View>
          </View>
        </Dialog.Content>
        <Divider/>
        <Dialog.Actions style={styles.actionBar}>
          <Button icon="map">View On Map</Button>
          <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default QuakeDialog;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    borderRadius: 10
  },
  body: {
    backgroundColor: 'white',
    paddingTop: "5%"
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
  actionBar: {
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }
})
