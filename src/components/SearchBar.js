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
                <TextInput
                    label="Start Date"
                    placeholder="YYYY-MM-DD"
                    mode="outlined"
                    style={{flex:1, backgroundColor:"pink", height:30, paddingRight:10, paddingLeft:8}}
                    onChangeText={text => {
                        setStartDateValue(text)
                    }}
                    render={props =>
                        <TextInputMask
                            {...props}
                            type={'datetime'}
                            options={{
                                format: 'YYYY-MM-DD'
                            }}
                        />
                    }
                />
                <TextInput
                    label="End Date"
                    mode="outlined"
                    placeholder="YYYY-MM-DD"
                    style={{flex:1, backgroundColor:"pink", height:30, paddingRight:10, paddingLeft:8}}
                    onChangeText={text => {
                        setEndDateValue(text)
                    }}
                    render={props =>
                        <TextInputMask
                            {...props}
                            type={'datetime'}
                            options={{
                                format: 'YYYY-MM-DD'
                            }}
                        />
                    }
                />
            </View>
            <View style={styles.rowStyle}>
                <TextInput
                    label="Magnitude"
                    mode="outlined"
                    placeholder="x.xx"
                    style={{flex:1, backgroundColor:"pink", height:30, paddingRight:18, paddingLeft:8}}
                    onChangeText={text => {
                        setMagValue(text)
                    }}
                    render={props =>
                        <TextInputMask
                            {...props}
                            type={'custom'}
                            options={{
                                mask: '9.99'
                            }}
                        />
                    }
                />
                <Button
                    mode="contained" 
                    icon="arrow-right-circle" 
                    style={{flex:1, height:30, marginTop: 7, paddingRight:9}} 
                    labelStyle={{textAlignVertical: "bottom"}}
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
