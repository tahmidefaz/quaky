import { FETCH_QUAKE_DATA } from '../constants';
import { FETCH_CURRENT_LOCATION } from '../constants';
import { TEST_ACTION } from '../constants';

let defaultQuakeData={
    quakeData: [],
    test_obj: {}
}

const quakeDataReducer = (state = defaultQuakeData, action) => {
    switch(action.type) {
        case FETCH_QUAKE_DATA:
            return {
                ...state,
                quakeData: action.payload
            };
        case FETCH_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload
            }
        case TEST_ACTION:
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