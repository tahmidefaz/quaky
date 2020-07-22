import * as React from 'react';
import { ScrollView } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { markerDescription } from '../misc/support_functions'


const ListItems = (props) => {
    const state = useSelector(state => state)

    return (
        <ScrollView>
        <List.Section>
            {/* <List.Item
                title="First Item"
                description="Item description"
                left={props => <List.Icon {...props} color={Colors.yellow900} icon="circle" />}
            />
            <List.Item
                title="Second Item"
                description="Item description"
                left={props => <List.Icon {...props} color={Colors.red500} icon="circle" />}
                onPress={() => console.log(state)}
            />
            <List.Item
                title="Third Item" 
                description="Item description"
                left={props => <List.Icon {...props} color={Colors.green500} icon="circle" />}
                onPress={() => quakeData() }
            /> */}
            <List.Item
                title="Second Item"
                description="Item description"
                left={props => <List.Icon {...props} color={Colors.red500} icon="circle" />}
                onPress={() => console.log(state.currentLocation)}
            />
            {
                state.quakeData.map(quake =>
                    <List.Item
                    title={quake.properties.title}
                    description={markerDescription(quake.properties.time)}
                    left={props => <List.Icon {...props} color={Colors.yellow900} icon="circle" />}
                    key={ quake.properties.code }
                 />
                )
            }
        </List.Section>
        </ScrollView>
    )
};

export default ListItems;
