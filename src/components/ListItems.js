import * as React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { loadQuakeData, setDialogStatus } from '../redux/actions';

import { markerDescription, calculateDistance, listItemColor, formatTitle } from '../misc/support_functions';
import QuakeDialog from './QuakeDialog';
import ListIcon from './ListIcon';


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
            depth: quakeData.geometry.coordinates[2] ? quakeData.geometry.coordinates[2].toFixed(2) : null,
            distance: calculateDistance(quakeData.geometry.coordinates[1], quakeData.geometry.coordinates[0], state.currentLocation, "M")
        });
        dispatch(setDialogStatus(true));
    }

    return (
        <ScrollView
            style={{height:'82%'}}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <List.Section>
                {
                    state.quakeData.map(quake =>
                        <List.Item
                        title={formatTitle(quake.properties.place)}
                        description={markerDescription(quake.properties.time)}
                        left={props => <ListIcon {...props} iconColor={listItemColor(quake.properties.mag)} quakeMag={quake.properties.mag.toFixed(1)}/>}
                        key={ quake.properties.code }
                        onPress={() => handleItemPress(quake)}
                        />
                    )
                }
            </List.Section>
            <QuakeDialog data={selectedData} jumpTo={props.jumpTo} view="listview"/>
        </ScrollView>
    )
};

export default ListItems;
