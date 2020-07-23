import * as ACTIONS from '../constants';

let defaultQuakeData={
    quakeData: [],
    currentLocation: {},
    isDialogOpen: false,
    selected_feature: {
        mag: 0,
        time:"",
        url:"",
        place:"",
        longitude: 0,
        latitude: 0,
        depth: 0
     },
    test_obj: {}
}

const quakeDataReducer = (state = defaultQuakeData, action) => {
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
        case ACTIONS.SELECTED_FEATURE:
            return {
                ...state,
                selected_feature: action.payload
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

export default quakeDataReducer;