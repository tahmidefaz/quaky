import React from 'react';
import { StyleSheet,View,TextInput } from 'react-native';
import { Callout } from 'react-native-maps';

const QuakeList = (props) => {
    return(
      <Callout>
        <View style={styles.calloutView} >
          <TextInput style={styles.calloutSearch}
            placeholder={"List List List"}
          />
        </View>
        {console.log(props.list)}
      </Callout>
    );
};

const styles = StyleSheet.create({
  calloutView: {
  flexDirection: "row",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: 10,
  width: "50%",
  marginLeft: "10%",
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


export default QuakeList
