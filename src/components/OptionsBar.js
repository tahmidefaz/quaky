import React from 'react';
import { View } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { setMapDataSource } from '../redux/actions';


const OptionsBar = (props) => {
    const dispatch = useDispatch();

    const handlePlotPress = (jumpTo) =>{
        if (props.screen == 'searchview') {
            dispatch(setMapDataSource('search'));
        } else {
            dispatch(setMapDataSource('recent'));
        }
        jumpTo('mapview');
    }

    return (
        <View style={{backgroundColor: '#dfe6e9', justifyContent:'space-between', padding:5, flexDirection:'row'}}>
            <Subheading style={{marginHorizontal: 10, fontSize: 18, fontWeight:'bold',paddingTop:5}}>Options</Subheading>
            <Button
                icon="map-check"
                compact="true"
                mode="outlined"
                style={{width:'30%', marginHorizontal:10, height:35}} 
                onPress={()=>handlePlotPress(props.jumpTo)}>
                    Plot
            </Button>
        </View>
    );
};

export default OptionsBar;
