import * as React from 'react';
import { List, Colors } from 'react-native-paper';

const ListItems = (props) => (
    <List.Section>
        {console.log("handleDataRefresh", props.handleDataRefresh)}
        <List.Item
            title="First Item"
            description="Item description"
            left={props => <List.Icon {...props} color={Colors.yellow900} icon="circle" />}
        />
        <List.Item
            title="Second Item"
            description="Item description"
            left={props => <List.Icon {...props} color={Colors.red500} icon="circle" />}
        />
        <List.Item
            title="Third Item"
            description={props.quakeData}
            left={props => <List.Icon {...props} color={Colors.green500} icon="circle" />}
        />
    </List.Section>
);

export default ListItems;
