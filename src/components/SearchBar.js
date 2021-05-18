import React,{ useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, TextInput, Paragraph } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'

import { loadQuakeSearchData } from '../redux/actions';

const SearchBar = () => {
    const [startDateValue, setStartDateValue] = useState('2021-05-17')
    const [endDateValue, setEndDateValue] = useState('2021-05-18')
    const [magValue, setMagValue] = useState('02.50')
    const [filterInfo, setFilterInfo] = useState([startDateValue,endDateValue,magValue])

    const dispatch = useDispatch();

    const getFilteredQuakeData = () => {
        dispatch(loadQuakeSearchData(startDateValue,endDateValue,magValue));
        setFilterInfo([startDateValue,endDateValue,magValue]);
    }

    return (
        <View style={styles.filterBarStyle}>
            <View style={styles.rowStyle}>
                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'YYYY-MM-DD'
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
                        format: 'YYYY-MM-DD'
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
                    compact="true"
                    onPress={()=>getFilteredQuakeData()}
                >
                    Search
                </Button>
            </View>
            <Paragraph adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling style={{paddingLeft: 10}}>{`Showing results from ${filterInfo[0]} to ${filterInfo[1]} for magnitude ${filterInfo[2]} or higher`}</Paragraph>
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
