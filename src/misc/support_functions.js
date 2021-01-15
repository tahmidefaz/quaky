import { Colors } from 'react-native-paper';


export const markerDescription = (quakeTime) => {
    diff = (Date.now() - quakeTime)/1000;
    if (diff > 3600){
      diff = (Math.round((diff/60/60)*10)/10).toString()+" hours ago";
    } else if (diff < 3600 && diff > 60){
      diff = (Math.round((diff/60)*10)/10).toString()+" minutes ago"
    } else{
      diff = (Math.round(diff*10)/10).toString()+" seconds ago"
    }
    return diff;
}

export const calculateDistance = (lat1, lon1, currLocation, unit) => {
    var lat2 = currLocation.latitude;
    var lon2 = currLocation.longitude;
    if ((lat1 == lat2) && (lon1 == lon2)) {
  		return 0;
  	}
  	else {
  		var radlat1 = Math.PI * lat1/180;
  		var radlat2 = Math.PI * lat2/180;
  		var theta = lon1-lon2;
  		var radtheta = Math.PI * theta/180;
  		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  		if (dist > 1) {
  			dist = 1;
  		}
  		dist = Math.acos(dist);
  		dist = dist * 180/Math.PI;
  		dist = dist * 60 * 1.1515;

        switch(unit){
            case "K":
                return ((dist * 1.609344).toFixed(2) + " km")
            case "N":
                return ((dist * 0.8684).toFixed(2) + " N mi")
            default:
                return (dist.toFixed(2) + " mi")
        }
  	}
}

export const listItemColor = (mag) => {
    if (mag > 5.5){
        return Colors.red500;
    } else if (mag >=4.5 && mag <= 5.5) {
        return Colors.yellow900;
    } else {
        return Colors.green500;
    }
}

export const markerColor = (mag) => {
    if (mag > 5.5){
        return 'red'
    } else if (mag >=4.5 && mag <= 5.5) {
        return 'orange';
    } else {
        return 'green';
    }
}

const toDegreesMinutesAndSeconds = (coordinate) => {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "°" + minutes + "\'" + seconds + "\"";
}

export const convertDMS = (lat, long) => {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(long);
    var longitudeCardinal = long >= 0 ? "E" : "W";

    return latitude + " " + latitudeCardinal + ", " + longitude + " " + longitudeCardinal;
}

export const dateParser = (timestamp) => {
    const date = new Date(timestamp);
    // return date.toUTCString();
    return date.toUTCString().split(' ').slice(1).join(' ');
}
