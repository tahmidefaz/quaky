import axios from "axios";
import { FETCH_QUAKE_DATA } from '../constants';
import {FETCH_CURRENT_LOCATION} from '../constants';
import { TEST_ACTION } from '../constants';


export function loadQuakeData() {
    return dispatch => {
        axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
            .then(response => {
                dispatch(quakeData(response.data.features));
            })
            .catch(err => dispatch(quakeData(response.data.err)))
    }
}

function quakeData(features) {
    console.log("fetched");
    // features.forEach((feature, i) => features[i] = updateFeature(feature));
    return {
        type: FETCH_QUAKE_DATA,
        payload: features
    }
}


export function loadCurrentLocation(currentLocation) {
    return {
        type: FETCH_CURRENT_LOCATION,
        payload: {...currentLocation}
    }
}

export function loadTestAction() {
    return {
        type: TEST_ACTION,
        payload: {"test_obj": true}
    }
}