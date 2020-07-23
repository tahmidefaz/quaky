import axios from "axios";
// import { FETCH_QUAKE_DATA } from '../constants';
// import {FETCH_CURRENT_LOCATION} from '../constants';
// import {DIALOG_STATUS} from '../constants';
// import { TEST_ACTION } from '../constants';
import * as ACTIONS from '../constants';


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
    // console.log("fetched");
    // features.forEach((feature, i) => features[i] = updateFeature(feature));
    return {
        type: ACTIONS.FETCH_QUAKE_DATA,
        payload: features
    }
}


export function loadCurrentLocation(currentLocation) {
    return {
        type: ACTIONS.FETCH_CURRENT_LOCATION,
        payload: {...currentLocation}
    }
}

export function setDialogStatus(visible) {
    return {
        type: ACTIONS.DIALOG_STATUS,
        payload: visible
    }
}

export function loadSelectedFeature(feature) {
    return {
        type: ACTIONS.SELECTED_FEATURE,
        payload: { ...feature }
    }
}

export function loadTestAction() {
    return {
        type: ACTIONS.TEST_ACTION,
        payload: {"test_obj": true}
    }
}