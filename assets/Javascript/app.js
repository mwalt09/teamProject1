var config = {
    apiKey: "AIzaSyAyiP6kOsyeTTR6DPWoKJDh0ouv24I_8Ws",
    authDomain: "coffeeup-f6014.firebaseapp.com",
    databaseURL: "https://coffeeup-f6014.firebaseio.com",
    projectId: "coffeeup-f6014",
    storageBucket: "",
    messagingSenderId: "481137159989"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  var americano = 0;
  var auLait = 0;
  var cappuccino = 0;
  var espresso = 0;
  var latte = 0;
  var macchiatto = 0;
  var mocha = 0;
  var redEye = 0;

  database.ref().on("value", function(snapshot) {
    if(snapshot.child("latte").exists()) {
      latte = snapshot.val().latte;
    }
    if(snapshot.child("americano").exists()) {
      americano = snapshot.val().americano;
    }
    if(snapshot.child("auLait").exists()) {
      auLait = snapshot.val().auLait;
    }
    if(snapshot.child("cappuccino").exists()) {
      cappuccino = snapshot.val().cappuccino;
    }
    if(snapshot.child("espresso").exists()) {
      espresso = snapshot.val().espresso;
    }
    if(snapshot.child("macchiatto").exists()) {
      macchiatto = snapshot.val().macchiatto;
    }
    if(snapshot.child("mocha").exists()) {
      mocha = snapshot.val().mocha;
    }
    if(snapshot.child("redEye").exists()) {
      redEye = snapshot.val().redEye;
    }
  });

$('#questionString').html("What are your in the mood for?");

$('#images').hide();

$('button').keypress(function(event){

   if (event.keyCode === 10 || event.keyCode === 13)
        event.preventDefault();

 });

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
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/americano.png");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        americano++;
        database.ref().update({
          americano: americano
        });
        initMap();

    }
    if (userChoice === "flavor") {
        $('#questionString').html("RESULT: HAVE AN ESPRESSO");
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/espresso.png");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        espresso++;
        database.ref().update({
          espresso: espresso
        });
        initMap();
    }
    if (userChoice === "energy") {
        $('#questionString').html("RESULT: FOR ROUGH DAYS, TRY A RED EYE");
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/redEye.png");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        redEye++;
        database.ref().update({
          redEye: redEye
        });
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
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/auLait.png");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        auLait++;
        database.ref().update({
          auLait: auLait
        });
        initMap();
    }
    if (userChoice === "espresso") {
        $('#questionString').html("Sweet or Bitter?");
        $('#buttonOne').html("sweet");
        $('#buttonTwo').html("bitter");
    }
    if (userChoice === "sweet") {
        $('#questionString').html("RESULT: TRY A MACHIATTO?");
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/macchiatto.png");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        macchiatto++;
        database.ref().update({
          macchiatto: macchiatto
        });
        initMap();
    }
    if (userChoice === "bitter") {
        $('#questionString').html("RESULT: CAPPUCCINO TIME");
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/cappuccino.png");
        $('#buttonOne').hide("flavor");
        $('#buttonTwo').hide("energy");
        cappuccino++;
        database.ref().update({
          cappuccino: cappuccino
        });
        initMap();
    }

    if (userChoice === "Steamed") {
        $('#questionString').html("unsweet or chocolatey?");
        $('#buttonOne').html("unsweet");
        $('#buttonTwo').html("chocolatey");
    }
    if (userChoice === "unsweet") {
        $('#questionString').html("RESULT: LATTE TIME");
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/latte.png");
        $('#buttonOne').hide("unsweet");
        $('#buttonTwo').hide("chocolatey");
        latte++;
        database.ref().update({
          latte: latte
        });
        initMap();
    }
    if (userChoice === "chocolatey") {
        $('#questionString').html("RESULT: HAVE A MOCHA");
        $('#images').show();
        $('#images').attr("src", "assets/Images/coffeeTypes/mocha.png");
        $('#buttonOne').hide("unsweet");
        $('#buttonTwo').hide("chocolatey");
        mocha++;
        database.ref().update({
          mocha: mocha
        });
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
