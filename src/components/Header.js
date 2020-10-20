import * as React from 'react';
import { Appbar, Menu, Button, Checkbox } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';

import { showFaultLines } from '../redux/actions'

const Header = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [faultLines, setFaultLines] = React.useState("unchecked")

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const dispatch = useDispatch();
    const faultLinesHandler = () => {
        if(faultLines === "unchecked"){
            dispatch(showFaultLines(true));
            setFaultLines("checked");
        } else {
            dispatch(showFaultLines(false));
            setFaultLines("unchecked");
        }
    }

    return (
        <Appbar.Header dark={true}>
            <StatusBar style='light'/>
            <Appbar.Content title={props.title}/>
            {props.screen==='mapview' &&
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action 
                            icon='dots-vertical'
                            color='white'
                            onPress={openMenu}
                        />
                    }
                >
                    <Checkbox.Item label="Show Fault Lines" status={faultLines} onPress={faultLinesHandler}/>
                </Menu>
            }
        </Appbar.Header>
    );
}
export default Header;