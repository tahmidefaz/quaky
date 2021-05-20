import React,{ useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { setSearchDialogStatus } from '../redux/actions';

import { listItemColor, dateParser, calculateDistance, formatTitle } from '../misc/support_functions';
import QuakeDialogSearch from './QuakeDialogSearch';
import ListIcon from './ListIcon';


const SearchList = (props) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [selectedData, setSelectedData] = useState({});

    const handleItemPress = (quakeData) => {
        setSelectedData({
            mag: quakeData.properties.mag.toFixed(2),
            time: quakeData.properties.time,
            url: quakeData.properties.url,
            place: quakeData.properties.place,
            longitude: quakeData.geometry.coordinates[0],
            latitude: quakeData.geometry.coordinates[1],
            depth: quakeData.geometry.coordinates[2] ? quakeData.geometry.coordinates[2].toFixed(2) : null,
            distance: calculateDistance(quakeData.geometry.coordinates[1], quakeData.geometry.coordinates[0], state.currentLocation, "M")
        });
        dispatch(setSearchDialogStatus(true));
    }

    return(
        <ScrollView style={{height:'72%'}}>
            <List.Section>
                {
                    state.quakeSearchData.map(quake =>
                        <List.Item
                            title={formatTitle(quake.properties.place)}
                            description={dateParser(quake.properties.time)}
                            left={props => <ListIcon {...props} iconColor={listItemColor(quake.properties.mag)} quakeMag={quake.properties.mag.toFixed(1)}/>}
                            key={ quake.properties.code }
                            onPress={() => handleItemPress(quake)}
                        />
                    )
                }
            </List.Section>
            <QuakeDialogSearch data={selectedData} jumpTo={props.jumpTo}/>
        </ScrollView>
    );
};

export default SearchList;
