import React from 'react';
import { StyleSheet,View,ScrollView,Text } from 'react-native';
import { Callout } from 'react-native-maps';

const QuakeInfo = (props) => {
    return(
      <Callout>
        {props.currentLocation}
        <ScrollView style={styles.calloutView} >
          <Text style={styles.calloutSearch}
            placeholder={"List List List"}
          />
        </ScrollView>
      </Callout>
    );
};

const styles = StyleSheet.create({
  calloutView: {
  flexDirection: "row",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: 10,
  width: "60%",
  marginLeft: "5%",
  marginRight: "30%",
  marginTop: 30
  },
  calloutSearch: {
  borderColor: "transparent",
  marginLeft: 10,
  width: "90%",
  marginRight: 10,
  height: 40,
  borderWidth: 0.0
  }
});


export default QuakeInfo;
