import * as React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { loadQuakeData, setDialogStatus, loadSelectedFeature } from '../actions';

import { markerDescription, calculateDistance, listItemColor } from '../misc/support_functions';
import QuakeDialog from './QuakeDialog';


const ListItems = (props) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(loadQuakeData()).then(() => setRefreshing(false));
      }, []);
    
    const [selectedData, setSelectedData] = React.useState({});

    const handleItemPress = (quakeData) => {
        setSelectedData({
            mag: quakeData.properties.mag.toFixed(2),
            time: quakeData.properties.time,
            url: quakeData.properties.url,
            place: quakeData.properties.place,
            longitude: quakeData.geometry.coordinates[0],
            latitude: quakeData.geometry.coordinates[1],
            depth: quakeData.geometry.coordinates[2].toFixed(2),
            distance: calculateDistance(quakeData.geometry.coordinates[1], quakeData.geometry.coordinates[0], state.currentLocation, "M")
        });
        dispatch(setDialogStatus(true));
    }

    // const handleItemPress = (quakeData) => {
    //     dispatch(
    //         loadSelectedFeature({
    //             mag: quakeData.properties.mag.toFixed(2),
    //             time: quakeData.properties.time,
    //             url: quakeData.properties.url,
    //             place: quakeData.properties.place,
    //             longitude: quakeData.geometry.coordinates[0],
    //             latitude: quakeData.geometry.coordinates[1],
    //             depth: quakeData.geometry.coordinates[2].toFixed(2)
    //         })
    //     );
    //     dispatch(setDialogStatus(true));
    // }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <List.Section>
                {
                    state.quakeData.map(quake =>
                        <List.Item
                        title={quake.properties.title}
                        description={markerDescription(quake.properties.time)}
                        left={props => <List.Icon {...props} color={ listItemColor(quake.properties.mag) } icon="circle" />}
                        key={ quake.properties.code }
                        onPress={() => handleItemPress(quake)}
                        />
                    )
                }
            </List.Section>
            <QuakeDialog data={selectedData} />
        </ScrollView>
    )
};

export default ListItems;
