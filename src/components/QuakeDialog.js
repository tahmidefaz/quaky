import * as React from 'react';
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { setDialogStatus } from '../actions';

const dateParser = (timestamp) => {
  const date = new Date(timestamp);
  return date.toUTCString();
}

const QuakeDialog = (props) => {
  const state = useSelector(state => state)

  const dispatch = useDispatch();
  const hideDialog = () => dispatch(setDialogStatus(false));
  console.log(state.selected_feature)
  return (
    <Portal>
      <Dialog visible={state.isDialogOpen} onDismiss={hideDialog}>
        <Dialog.Title>Earthquake Information</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Magnitude: { state.selected_feature.mag+" M" }</Paragraph>
          <Paragraph>Depth: { state.selected_feature.depth+" km" }</Paragraph>
          <Paragraph>Place: { state.selected_feature.place }</Paragraph>
          <Paragraph>Time: { dateParser(state.selected_feature.time) }</Paragraph>
          <Paragraph>URL: { state.selected_feature.url }</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default QuakeDialog;