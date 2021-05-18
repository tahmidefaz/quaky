import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import { listItemColor } from '../misc/support_functions';;

const SearchList = () => {
    return(
        <ScrollView>
            <List.Section>
                <List.Item
                    title="This is a title"
                    description="description..."
                    left={props => <List.Icon {...props} color={ listItemColor(7.5) } icon="circle" />}
                    key='934900'
                />
                <List.Item
                    title="This is a title"
                    description="description..."
                    left={props => <List.Icon {...props} color={ listItemColor(4.7) } icon="circle" />}
                    key='2342'
                />
                <List.Item
                    title="This is a title"
                    description="description..."
                    left={props => <List.Icon {...props} color={ listItemColor(2.5) } icon="circle" />}
                    key='998'
                />
            </List.Section>
        </ScrollView>
    );
};

export default SearchList;
