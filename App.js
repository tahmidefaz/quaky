import React from 'react';
import { StyleSheet } from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider as StoreProvider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers/index.js'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNav from './src/components/AppNav';


let store = createStore(reducers, applyMiddleware(thunk))

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    // accent: '#ffffff',
  },
};


export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <AppNav />
        </PaperProvider>
      </StoreProvider>
      
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
});
