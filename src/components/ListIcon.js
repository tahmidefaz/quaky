import React from 'react';
import { Headline } from 'react-native-paper';

const ListIcon = (props) => {
    return (
        <Headline style={{...props.style, fontSize: 22, fontWeight: 'bold', color: props.iconColor, paddingLeft: 7}}>
            {props.quakeMag}
        </Headline>
    );
};

export default ListIcon;