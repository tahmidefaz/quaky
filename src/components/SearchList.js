import React,{ useState } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { setMapDialogStatus } from '../redux/actions';

import { listItemColor, dateParser, calculateDistance } from '../misc/support_functions';
import QuakeDialogMap from './QuakeDialogMap';

const SearchList = () => {
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
        dispatch(setMapDialogStatus(true));
    }

    return(
        <ScrollView>
            <List.Section>
                {
                    state.quakeSearchData.map(quake =>
                        <List.Item
                            title={quake.properties.title}
                            description={dateParser(quake.properties.time)}
                            left={props => <List.Icon {...props} color={ listItemColor(quake.properties.mag) } icon="circle" />}
                            key={ quake.properties.code }
                            onPress={() => handleItemPress(quake)}
                        />
                    )
                }
            </List.Section>
            <QuakeDialogMap data={selectedData}/>
        </ScrollView>
    );
};

export default SearchList;
