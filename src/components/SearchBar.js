import React,{ useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Paragraph } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'


const SearchBar = () => {
    const [startDateValue, setStartDateValue] = useState('Start Date')
    const [endDateValue, setEndDateValue] = useState('End Date')
    const [magValue, setMagValue] = useState('00.00')
    return (
        <View style={styles.filterBarStyle}>
            <View style={styles.rowStyle}>
                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'MM/DD/YYYY'
                    }}
                    value={startDateValue}
                    style={{flex:1,height:30,margin:'2%',paddingLeft:10,fontSize:16,borderWidth:1,borderColor:'grey',borderRadius:2}}
                    onChangeText={text => {
                        setStartDateValue(text)
                    }}
                />
                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'MM/DD/YYYY'
                    }}
                    value={endDateValue}
                    style={{flex:1,height:30,margin:'2%',paddingLeft:10,fontSize:16,borderWidth:1,borderColor:'grey',borderRadius:2}}
                    onChangeText={text => {
                        setEndDateValue(text)
                    }}
                />
            </View>
            <View style={styles.rowStyle}>
                {/* <TextInput
                    label="Magnitude"
                    mode="outlined"
                    style={{flex:1, backgroundColor:"pink", height:30, paddingRight:19}}
                    dense="true"
                /> */}
                <TextInputMask
                    type={'custom'}
                    options={{
                        mask: '99.99'
                    }}
                    value={magValue}
                    style={{flex:1,height:30,margin:'2%', paddingLeft:10, marginRight:25, fontSize:16,borderWidth:1,borderColor:'grey',borderRadius:2}}
                    onChangeText={text => {
                        setMagValue(text)
                    }}
                />
                <Button 
                    mode="outlined" 
                    icon="arrow-right-circle" 
                    style={{flex:1, width:10, height:30, marginTop: 7 }} 
                    compact="true">
                        Search
                </Button>
            </View>
            <Paragraph adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling style={{padding:"1%"}}>Showing results from mm/dd/yyyy to mm/dd/yyyy for magnitude 00.0 or higher </Paragraph>
        </View>
    );
};

export default SearchBar;

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
