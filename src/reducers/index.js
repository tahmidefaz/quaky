let defaultQuakeData={
    data: []
}

const quakeDataReducer = (state=defaultQuakeData, action) => {
    if(action.type==="FETCH_QUAKE_DATA") {
        return {
            ... state,
            data: action.data
        }
    } else {
        return {
            ... state
        }
    }
}

export default quakeDataReducer;