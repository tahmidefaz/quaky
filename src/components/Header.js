import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu, Checkbox, Subheading } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';

import { showFaultLines } from '../redux/actions'
import { View } from 'react-native';

const Header = (props) => {
    const state = useSelector(state => state);

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
            {
                props.screen === 'mapview' ?
                <View style={{ flexDirection:'column', flex:1}}>
                    <View style={{flexDirection:'row',flex:1}}>
                        <Appbar.Content title={props.title}/>
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
                    </View>
                    <Subheading
                        adjustsFontSizeToFit minimumFontScale={.5} numberOfLines={1} allowFontScaling
                        style={styles.mapInfo}
                    >
                        {
                            state.mapDataSource === 'recent' ?
                                'Showing recent earthquakes' :
                                `Showing results from ${state.searchInfo[0]} to ${state.searchInfo[1]} for magnitude ${state.searchInfo[2]}+`
                        }
                    </Subheading>
                </View> :
                <Appbar.Content title={props.title} />
            }
        </Appbar.Header>
    );
}

export default Header;

const styles = StyleSheet.create({
    mapInfo: {
        color:'white',
        width: '100%',
        flex:1,
        marginTop:10,
        marginBottom:2,
        paddingLeft: '2%',
        fontSize: 10
    }
});
