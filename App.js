import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import {Provider as StoreProvider} from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNav from './src/components/AppNav';

import { loadCurrentLocation, setMapRegion } from './src/redux/actions';
import store from './src/redux/store/configureStore';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    // accent: '#ffffff',
  },
};

const defaultLocation = {
  latitude: 37,
  longitude: -122,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default function App() {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        store.dispatch(loadCurrentLocation(defaultLocation));
        store.dispatch(setMapRegion(defaultLocation.latitude, defaultLocation.longitude));
      }

      await Location.getCurrentPositionAsync({})
      .then((location)=> {
        store.dispatch(loadCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }));
        store.dispatch(setMapRegion(location.coords.latitude, location.coords.longitude));
      }
      )
      .catch((error)=> {
        store.dispatch(loadCurrentLocation(defaultLocation));
        store.dispatch(setMapRegion(defaultLocation.latitude, defaultLocation.longitude));
      });
    })();
  });

  return (
    <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <AppNav />
        </PaperProvider>
      </StoreProvider>
  );
}
