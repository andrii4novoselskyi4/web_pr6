const ourCoords = {
    latitude: 48.943207,
    longitude: 24.732017
};


document.addEventListener("DOMContentLoaded", getMyLocation)

function getMyLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else{
        alert("Oop, no geolocation support");
    }
}
    


function displayLocation(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let div = document.getElementById("location")
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`;
    let km = computerDistance(position.coords, ourCoords);
    let distance= document.getElementById("distance")
    distance.innerHTML = `You are ${km} km from the College`;
}

function displayError(error) {
    const errorTypes ={
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: 'Request timed out'
    };
    const errorMessage = errorTypes[error.code];
    if (errorMessage.code ==0 || error.code ==2){
        errorMessage = errorMessage + "" + error.message;
    }
    let div = document.getElementById("location")
    div.innerHTML = errorMessage;
    
}
function computerDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;
    
    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
    Math.cos(startLatRads) * Math.cos(destLatRads) * 
    Math.cos(destLongRads - startLongRads)) * Radius;
    return distance;
}
function degreesToRadians(degrees) {
    let radians = (degrees * Math.PI) / 180;
    return radians;
}


