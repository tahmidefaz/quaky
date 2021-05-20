import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import OptionsBar from './OptionsBar';
import SearchBar from './SearchBar';
import SearchList from './SearchList';


const SearchView = (props) => {
    const state = useSelector(state => state);

    return (
        <View>
            <SearchBar/>
            {
                state.quakeSearchData.length > 0 &&  <OptionsBar {...props} screen='searchview'/>
            }
            <SearchList {...props}/>
        </View>
    )
};

export default SearchView;
