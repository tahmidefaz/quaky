import React,{ useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, TextInput, Paragraph } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'

import { loadQuakeSearchData, setCurrentSearchInfo } from '../redux/actions';

const SearchBar = () => {
    const [startDateValue, setStartDateValue] = useState('')
    const [endDateValue, setEndDateValue] = useState('')
    const [magValue, setMagValue] = useState('')
    const [filterInfo, setFilterInfo] = useState([startDateValue,endDateValue,magValue])

    const dispatch = useDispatch();

    const getFilteredQuakeData = () => {
        dispatch(loadQuakeSearchData(startDateValue,endDateValue,magValue));
        setFilterInfo([startDateValue,endDateValue,magValue]);
        dispatch(setCurrentSearchInfo([startDateValue,endDateValue,magValue]));
        Keyboard.dismiss();
    }

    return (
        <View style={styles.filterBarStyle}>
            <View style={styles.rowStyle}>
                <TextInput
                    label="Start Date"
                    placeholder="YYYY-MM-DD"
                    mode="outlined"
                    style={styles.filterInputOptions}
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
                    style={styles.filterInputOptions}
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
                    style={styles.filterInputOptions}
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
                            keyboardType='number-pad'
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
            {
                filterInfo.some(item => item !== '') ?
                    <Paragraph adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling style={{paddingLeft: 12}}>{`Showing results from ${filterInfo[0]} to ${filterInfo[1]} for magnitude ${filterInfo[2]} or higher`}</Paragraph>
                : <Paragraph adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling style={{paddingLeft: 12, fontSize: 10}}>Provide all the search criteria and press search to look up earthquakes</Paragraph>
            }
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
        backgroundColor:'#b2bec3'
    },
    filterInputOptions: {
        flex:1,
        backgroundColor:"#b2bec3",
        height:30,
        paddingRight:18,
        paddingLeft:8
    }
})
