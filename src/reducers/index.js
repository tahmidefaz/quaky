import * as ACTIONS from '../constants';

export const defaultQuakeData={
    quakeData: [],
    currentLocation: {},
    isDialogOpen: false,
    mapRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    },
    test_obj: {}
}

export const quakeDataReducer = (state = defaultQuakeData, action) => {
    switch(action.type) {
        case ACTIONS.FETCH_QUAKE_DATA:
            return {
                ...state,
                quakeData: action.payload
            };
        case ACTIONS.FETCH_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload
            }
        case ACTIONS.DIALOG_STATUS:
            return {
                ...state,
                isDialogOpen: action.payload
            }
        case ACTIONS.SET_MAP_REGION:
            return {
                ...state,
                mapRegion: action.payload
            }
        case ACTIONS.TEST_ACTION:
            return {
                ...state,
                test_obj: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
