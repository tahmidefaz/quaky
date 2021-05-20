import * as ACTIONS from '../constants';

export const defaultQuakeData={
    quakeData: [],
    currentLocation: {},
    isDialogOpen: false,
    mapDataSource: 'recent',
    isMapDialogOpen: false,
    isSearchDialogOpen: false,
    mapRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    },
    showFaultLines: false,
    quakeSearchData: [],
    searchInfo: [],
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
        case ACTIONS.SET_MAP_DATA_SOURCE:
            return {
                ...state,
                mapDataSource: action.payload
            }
        case ACTIONS.MAP_DIALOG_STATUS:
            return {
                ...state,
                isMapDialogOpen: action.payload
            }
        case ACTIONS.SEARCH_DIALOG_STATUS:
            return {
                ...state,
                isSearchDialogOpen: action.payload
            }
        case ACTIONS.SET_MAP_REGION:
            return {
                ...state,
                mapRegion: action.payload
            }
        case ACTIONS.SHOW_FAULT_LINES:
            return {
                ...state,
                showFaultLines: action.payload
            }
        case ACTIONS.FETCH_QUAKE_SEARCH_DATA:
            return {
                ...state,
                quakeSearchData: action.payload
            }
        case ACTIONS.CURRENT_SEARCH_INFO:
            return  {
                ...state,
                searchInfo: action.payload
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
