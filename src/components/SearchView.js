import React from 'react';
import { View } from 'react-native';
import OptionsBar from './OptionsBar';
import SearchBar from './SearchBar';
import SearchList from './SearchList';



const SearchView = (props) => {
    return (
        <View>
            <SearchBar/>
            <OptionsBar {...props} screen='searchview'/>
            <SearchList {...props}/>
        </View>
    )
};

export default SearchView;
