import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';

import OptionsBar from './OptionsBar';
import SearchBar from './SearchBar';
import SearchList from './SearchList';

import { setSnackbarVisible } from '../redux/actions';


const SearchView = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const onDismissSnackBar = () => dispatch(setSnackbarVisible(false));

    return (
        <View>
            <SearchBar/>
            {
                state.quakeSearchData.length > 0 &&  <OptionsBar {...props} screen='searchview'/>
            }
            <SearchList {...props}/>
            <Snackbar
                visible={state.snackbarVisible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Undo',
                onPress: () => {
                    // Do something
                },
                }}>
                    Hey there! I'm a Snackbar.
            </Snackbar>
        </View>
    )
};

export default SearchView;
