console.log("Correct Map");

var map;
var pos;
var infowindow;
var infoWindowUser;
var interval;
var GeoMarker;

function initMap() {
  var austin = {
    lat: 30.2672,
    lng: -97.7431
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: austin,
    zoom: 13,
    mapTypeId: "roadmap"
  });

  infowindow = new google.maps.InfoWindow();
  // infoWindowUser = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: 'blueDot.png',
        position: pos
      });

      map.setCenter(pos);

      // GeoMarker = new GeolocationMarker();
      // GeoMarker.setCircleOptions({fillColor: '#808080'});
      //
      // GeoMarker.setMap(map);

      // infoWindowUser.setPosition(pos);
      // infoWindowUser.setContent('Location found.');
      // infoWindowUser.open(map);
      // map.setCenter(pos);

      search();

    }, function() {
      handleLocationError(true, infoWindowUser, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindowUser, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindowUser.setPosition(pos);
    infoWindowUser.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindowUser.open(map);
    console.log("I just blocked this");
  }
}



function search() {

  var request = {
    location: pos,
    radius: '4000',
    type: ["cafe"]
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    // icon: 'coffee-icon-png-24.png',
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
