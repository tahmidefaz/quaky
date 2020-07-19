import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const Header = (props) => (
    <Appbar.Header dark={true}>
        <StatusBar style='light'/>
       <Appbar.Content title={props.title}/>
    </Appbar.Header>
);

export default Header;