import React from 'react';
import { View } from 'react-native';
import OptionsBar from './OptionsBar';
import SearchBar from './SearchBar';
import SearchList from './SearchList';



const SearchView = () => {
    return (
        <View>
            <SearchBar/>
            <OptionsBar/>
            <SearchList/>
        </View>
    )
};

export default SearchView;
