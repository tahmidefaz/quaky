import * as React from 'react';
import { List, Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';


const ListItems = (props) => {
    const state = useSelector(state => state)

    return (
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
            {
                state.quakeData.map(quake =>
                    <List.Item
                    title={quake.properties.title}
                    description="Item description"
                    left={props => <List.Icon {...props} color={Colors.yellow900} icon="circle" />}
                    key={ quake.properties.code }
                 />
                )
            }
        </List.Section>
    )
};

export default ListItems;
