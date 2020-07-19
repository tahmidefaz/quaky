import axios from "axios";

export function loadQuakeData() {
    return(dispatch)=>{
        return axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson')
                .then((response) => {
                    dispatch(quakeData(response.data.features))
                });
    }
}

export function quakeData(features) {
    return {
        type:"FETCH_QUAKE_DATA",
        data: features
    }
}