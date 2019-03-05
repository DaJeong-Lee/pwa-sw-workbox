//function that retrieves the position
function showPosition(position) {
  console.log('showPosition')
  var location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  }
  console.log(location);
  showInMap(position)
}

function locationError(error) {
    console.log(error)
    switch(error.code) {
        case 1:
            return "User denied the request for Geolocation."
            break;
        case 2:
            return "Location information is unavailable."
            break;
        case 3:
            return "The request to get user location timed out."
            break;
    }

    return "An unknown error occurred."
}

function showInMap(pos) {
    var latlon = pos.coords.latitude + "," + pos.coords.longitude;
    var api_key = "your key";
    var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&scale=1&size=400x300&maptype=roadmap&key=${api_key}&format=png&visual_refresh=true&markers=size:tiny%7Ccolor:0xff0000%7Clabel:1%7C${latlon}`;

    var map = document.querySelector("#mapholder");
    map.innerHTML = "<img src='"+img_url+"'>";
}

//request for location
//function that gets the location and returns it
function getLocation() {
  console.log('start getLocation');
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				//do succes handling
				showPosition(position)
			},
			function errorCallback(error) {
				//do error handling
				msg = locationError(error)
				alert(msg)
			},
			{
				maximumAge: 0,
				timeout: 5000,
				enableHighAccuracy: true
			}
		);
	}
}

getLocation();
