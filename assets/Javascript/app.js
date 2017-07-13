
$('#questionString').html("What are your in the mood for?");

$('button').on('click', function () {
    // alert($(this).text());
    userChoice = $(this).text();
    // alert(userChoice);

//BLACK COFFEE
    if (userChoice === "Black") {
        $('#questionString').html("Do you prefer a small or large amount?");
        $('#buttonOne').html("Small");
        $('#buttonTwo').html("Large");
    }
    if (userChoice === "Small") {
        $('#questionString').html("Is flavor or energy more important?");
        $('#buttonOne').html("flavor");
        $('#buttonTwo').html("energy");
    }
    if (userChoice === "Large") {
        $('#questionString').html("RESULT: DRINK AN AMERICANO");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        initMap();

    }
    if (userChoice === "flavor") {
        $('#questionString').html("RESULT: HAVE AN ESPRESSO");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        initMap();
    }
    if (userChoice === "energy") {
        $('#questionString').html("RESULT: FOR ROUGH DAYS, TRY A RED EYE");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        initMap();
    }

//WHITE COFFEE
    if (userChoice === "White") {
        $('#questionString').html("Would you prefer foam or steamed milk?");
        $('#buttonOne').html("Foam");
        $('#buttonTwo').html("Steamed");
    }
    if (userChoice === "Foam") {
        $('#questionString').html("Coffee or espresso?");
        $('#buttonOne').html("coffee");
        $('#buttonTwo').html("espresso");
    }
    if (userChoice === "coffee") {
        $('#questionString').html("RESULT: TRY A CAFE AU LATE");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        initMap();
    }
    if (userChoice === "espresso") {
        $('#questionString').html("Sweet or Bitter?");
        $('#buttonOne').html("sweet");
        $('#buttonTwo').html("bitter");
    }
    if (userChoice === "sweet") {
        $('#questionString').html("RESULT: TRY A MACHIATTO?");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        initMap();
    }
    if (userChoice === "bitter") {
        $('#questionString').html("RESULT: CAPPUCCINO TIME");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        initMap();
    }

    if (userChoice === "Steamed") {
        $('#questionString').html("unsweet or chocolatey?");
        $('#buttonOne').html("unsweet");
        $('#buttonTwo').html("chocolatey");
    }
    if (userChoice === "unsweet") {
        $('#questionString').html("RESULT: LATTE TIME");
        $('#buttonOne').hide("unsweet");
        $('#buttonTwo').hide("chocolatey");
        initMap();
    }
    if (userChoice === "chocolatey") {
        $('#questionString').html("RESULT: HAVE A MOCHA");
        $('#buttonOne').hide("unsweet");
        $('#buttonTwo').hide("chocolatey");
        initMap();
    }






});





console.log("Correct Map");

var map;
var pos;
var infowindow;
var infoWindowUser;
var interval;
var GeoMarker;

function initMap() {

  $("#mapText").html("Go and get some!");

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
        icon: 'assets/Images/blueDot.png',
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





// $(function() {
//   // enter
//     $("#searchTerm").keypress(function(e){
//     	if(e.keyCode===13){
//     		var searchTerm = $("#searchTerm").val();
// 		    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?";
// 		    $.ajax({
// 			url: url,
// 			type: 'GET',
// 			contentType: "application/json; charset=utf-8",
// 			async: false,
//         	dataType: "json",
//         	success: function(data, status, jqXHR) {
//         		//console.log(data);
//         		$("#output").html();
//         		for(var i=0;i<data[1].length;i++){
//         			$("#output").prepend("<div><div class='well'><a href="+data[3][i]+"><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
//         		}
//
//         	}
// 		})
//     	}
//     });
// // click ajax call
//     $("#search").on("click", function() {
//     	var searchTerm = $("#searchTerm").val();
// 		  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?";
// 		$.ajax({
// 			url: url,
// 			type: 'GET',
// 			contentType: "application/json; charset=utf-8",
// 			async: false,
//         	dataType: "json",
//           // plop data
//         	success: function(data, status, jqXHR) {
//         		console.log(data);
//         	}
// 		})
// 		.done(function() {
// 			console.log("success");
// 		})
// 		.fail(function() {
// 			console.log("error");
// 		})
// 		.always(function() {
// 			console.log("complete");
// 		});
