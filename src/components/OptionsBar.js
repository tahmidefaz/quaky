import React from 'react';
import { View } from 'react-native';

import { Button, Subheading } from 'react-native-paper';

const OptionsBar = (props) => {
    return (
        <View style={{backgroundColor: '#CFD8DC', justifyContent:'space-between', padding:5, flexDirection:'row'}}>
            <Subheading style={{marginHorizontal: 10, fontSize: 18, fontWeight:'bold',paddingTop:5}}>Options</Subheading>
            <Button icon="map-check" compact="true" mode="outlined" style={{width:'30%', marginHorizontal:10, height:35}} onPress={()=>console.log('pressed')}>Plot</Button>
        </View>
    );
};

export default OptionsBar;
