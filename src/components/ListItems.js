import * as React from 'react';
import { ScrollView } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { setDialogStatus, loadSelectedFeature } from '../actions';
import { loaSelectFeature } from '../actions';

import { markerDescription } from '../misc/support_functions';
import QuakeDialog from './QuakeDialog';


const listItemColor = (mag) => {
    if (mag > 5.5){
        return Colors.red500;
    } else if (mag >=4.5 && mag <= 5.5) {
        return Colors.yellow900;
    } else {
        return Colors.green500;
    }
}

const ListItems = (props) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const handleItemPress = (quakeData) => {
        dispatch(
            loadSelectedFeature({
                mag: quakeData.properties.mag.toFixed(2),
                time: quakeData.properties.time,
                url: quakeData.properties.url,
                place: quakeData.properties.place,
                longitude: quakeData.geometry.coordinates[0],
                latitude: quakeData.geometry.coordinates[1],
                depth: quakeData.geometry.coordinates[2].toFixed(2)
            })
        );
        dispatch(setDialogStatus(true));
    }
    return (
        <ScrollView>
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
            <QuakeDialog/>
        </ScrollView>
    )
};

export default ListItems;
