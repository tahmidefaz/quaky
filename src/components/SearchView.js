import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Paragraph } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';


const SearchView = () => {
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    return (
        <View style={styles.filterBarStyle}>
            {/* <View style={styles.rowStyle}>
                <Button onPress={()=>setShowStart(true)}>Start date</Button>
                <Button onPress={()=>setShowEnd(true)}>End date</Button>
            </View> */}
            <View style={styles.rowStyle}>
                <TextInput
                    label="Start Date"
                    mode="outlined"
                    style={{flex:1,backgroundColor:"pink", height:30, paddingRight:10}}
                    dense="true"
                />
                <TextInput
                    label="End Date"
                    mode="outlined"
                    style={{flex:1,backgroundColor:"pink", height:30, paddingLeft: 10}}
                    dense="true"
                />
            </View>
            <View style={styles.rowStyle}>
                <TextInput
                    label="Magnitude"
                    mode="outlined"
                    style={{flex:1, backgroundColor:"pink", height:30, paddingRight:19}}
                    dense="true"
                />
                <Button mode="outlined" icon="arrow-right-circle" style={{flex:1, width:10, height:32, marginTop:6 }} compact="true">Search</Button>
            </View>
            <Paragraph adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling style={{padding:"1%"}}>Showing results from mm/dd/yyyy to mm/dd/yyyy for magnitude 00.0 or higher </Paragraph>
            {/* { showStart && (
                <DateTimePicker
                    value={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={()=>setShowStart(false)}
                />
            )}
            { showEnd && (
                <DateTimePicker
                    value={new Date()}
                    is24Hour={true}
                    display="default"
                    onChange={()=>setShowEnd(false)}
                />
            )} */}
        </View>
    )
};

export default SearchView;

const styles = StyleSheet.create({
    rowStyle: {
        margin: "1%",
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    filterBarStyle: {
        backgroundColor:'pink'
    }
})
