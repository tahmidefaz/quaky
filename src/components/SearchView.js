import React from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar';
import SearchList from './SearchList';


const SearchView = () => {
    return (
        <View>
            <SearchBar/>
            <SearchList/>
            {/* <View style={{marginTop:30}}></View> */}
        </View>
    )
};

export default SearchView;
