import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { markerDescription, listItemColor } from '../misc/support_functions';;

const SearchList = () => {
    const state = useSelector(state => state);

    return(
        <ScrollView>
            <List.Section>
                {
                    state.quakeSearchData.map(quake =>
                        <List.Item
                        title={quake.properties.title}
                        description={markerDescription(quake.properties.time)}
                        left={props => <List.Icon {...props} color={ listItemColor(quake.properties.mag) } icon="circle" />}
                        key={ quake.properties.code }
                        // onPress={() => handleItemPress(quake)}
                        />
                    )
                }
            </List.Section>
        </ScrollView>
    );
};

export default SearchList;
