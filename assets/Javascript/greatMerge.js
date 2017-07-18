
$("#floating-panel").hide();
$("#textDirections").hide();
$("#rankingContainer").hide();

//============================================================= FIREBASE ===============================================================

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

function topThree(){
  var coffee=[{
            name:"Americano",
            like:americano
     },
     {
            name:"Latte",
            like:latte
    },

   {       name:"Aulait",
            like:auLait

   },
    {       name:"Cappiccino",
            like:cappuccino

   },
    {       name:"Espresso",
            like:espresso

   },
    {       name:"Macchiatto",
            like:macchiatto

   },
    {       name:"Mocha",
            like:mocha

   },
    {       name:"Redeye",
            like:redEye

   }
  ];


   // get keys from object
   var arr = Object.keys(coffee);
   // sort keys array based on score value
   arr.sort(function(a, b) {
     return coffee[b].like - coffee[a].like;
   });
   // iterate key array and assign rank value to object
   for (var i = 0, rank = 1; i < arr.length; i++) {
     // assign rank value
     coffee[arr[i]].rank = rank;
     // increment rank only if score value is changed
     if (coffee[arr[i + 1]] && coffee[arr[i]].like != coffee[arr[i + 1]].like)
       rank++;

   }


   coffee.sort(function(a, b){
       if(a.rank < b.rank) return -1;
       if(a.rank > b.rank) return 1;
       return 0;
       });
   $("#ti").html("Top 3 preferd coffees")
      $("#top").html("");
     for (i=0; i<coffee.length;i++){
       if (coffee[i].rank<=3) {
         console.log(coffee[i]);
          $("#top").append("("+coffee[i].rank+") "+coffee[i].name+"<br>")
         }
       }

     }




//============================================================= WIKI API ===============================================================

function wikiSearch(input) {
  return new Promise(function(resolve, reject) {
    var type;

    switch (input) {
      case 'americano':
        type = 'cafe';
        break;
      case 'espresso':
        type = '';
        break;
      case 'list_of_coffee_drinks':
        type = '';
        break;
      case 'cafe au lait':
        type = '';
        break;
      case 'macchiato':
        type = 'cafe';
        break;
      case 'cappuccino':
        type = '';
        break;
      case 'latte':
        type = '';
        break;
      case 'mocha':
        type = 'cafe';
        break;
    }

    $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + type + ' ' + input + '&format=json&callback=?').then(function(data) {
      resolve(data[2][0]);
      console.log(data);
    });
  });
}

function setDescription(text) {
  var question;
  var btn1;
  var btn2;

  switch (text) {
    case 'americano':
      question = 'drink an americano';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;

    case 'espresso':
      question = 'have an espresso';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;

    case 'list_of_coffee_drinks':
      question = 'for rough days, try a red eye';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;

    case 'cafe au lait':
      question = 'try a cafe au late';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;
    case 'macchiato':
      question = 'try a macchiato';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;
    case 'cappuccino':
      question = 'try a cappuccino';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;
    case 'latte':
      question = 'try a latte';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;

    case 'mocha':
      question = 'have a mocha';
      btn1 = 'flavor';
      btn2 = 'energy';
      break;

  }

  wikiSearch(text).then(function(data) {

    if (text !== "list_of_coffee_drinks") {
      $('#questionString').html(question.toUpperCase());
      $('#wiki-info').text(data);
      $('#buttonOne').hide(btn1);
      $('#buttonTwo').hide(btn2);
    } else {
      $('#questionString').html(question.toUpperCase());
      $('#wiki-info').text("Regular coffee (slow brewed as with a filter or cafetière) is sometimes combined with espresso to increase intensity of flavour or caffeine. This may be called a variety of names, most commonly 'red eye', 'shot in the dark', and 'depth charge' – though this is a federally registered trademark of a company, Caribou Coffee, so usage is restricted. Coffeehouse chains may have their own names, such as 'turbo' at Dunkin' Donuts. A double shot of espresso in the coffee may be termed a 'black eye', and a triple shot a 'dead eye'. 'Caffè Tobio' is a version with an equal amount of coffee to espresso.");
      $('#buttonOne').hide(btn1);
      $('#buttonTwo').hide(btn2);
    }
  });
}

//============================================================= APP ===============================================================

$('#questionString').html("What are you in the mood for?");

$('#images').hide();

$('button').keypress(function(event){

   if (event.keyCode === 10 || event.keyCode === 13)
        event.preventDefault();

 });

$('button').on('click', function () {
    // alert($(this).text());
    userChoice = $(this).text();

  //black coffee
  switch (userChoice) {
    case 'Black':
      $('#questionString').html("Do you prefer a small or large amount?");
      $('#buttonOne').html("Small");
      $('#buttonTwo').html("Large");
      break;
    case 'Large':
      $('#questionString').html("DRINK AN AMERICANO");
      setDescription('americano');
      $('#buttonOne').hide("flavor");
      $('#buttonTwo').hide("energy");
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/americano.png");
      americano++;
      database.ref().update({
        americano: americano
      });
      initMap();
      $("#rankingContainer").show();
      topThree();
      break;
    case 'Small':
      $('#questionString').html("Is flavor or energy more important?");
      $('#buttonOne').html("flavor");
      $('#buttonTwo').html("energy");
      break;
    case 'flavor':
      $('#questionString').html("HAVE AN ESPRESSO");
      setDescription('espresso');
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/espresso.png");
      $('#buttonOne').hide("flavor");
      $('#buttonTwo').hide("energy");
      espresso++;
      database.ref().update({
        espresso: espresso
      });
      $("#rankingContainer").show();
      topThree();
      initMap();
      break;
    case 'energy':
      $('#questionString').html("FOR ROUGH DAYS, TRY A RED EYE");
      setDescription('list_of_coffee_drinks');
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/redEye.png");
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#buttonOne').hide("flavor");
      $('#buttonTwo').hide("energy");
      redEye++;
      database.ref().update({
        redEye: redEye
      });
      $("#rankingContainer").show();
      topThree();
      initMap();
      break;

      //white coffee

    case 'White':
      $('#questionString').html("Would you prefer foam or steamed milk?");
      $('#buttonOne').html("Foam");
      $('#buttonTwo').html("Steamed");
      break;
    case 'Foam':
      $('#questionString').html("Coffee or espresso?");
      $('#buttonOne').html("coffee");
      $('#buttonTwo').html("espresso");
      break;
    case 'coffee':
      $('#questionString').html("TRY A CAFE AU LATE");
      setDescription('cafe au lait');
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/auLait.png");
      $('#buttonOne').hide("flavor");
      $('#buttonTwo').hide("energy");
      auLait++;
      database.ref().update({
        auLait: auLait
      });
      $("#rankingContainer").show();
      topThree();
      initMap();
      break;
    case 'espresso':
      $('#questionString').html("Sweet or Bitter?");
      $('#buttonOne').html("sweet");
      $('#buttonTwo').html("bitter");
      break;
    case 'sweet':
      $('#questionString').html("TRY A MACCHIATO?");
      setDescription('macchiato');
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/macchiatto.png");
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#buttonOne').hide("flavor");
      $('#buttonTwo').hide("energy");
      macchiatto++;
      database.ref().update({
        macchiatto: macchiatto
      });
      $("#rankingContainer").show();
      topThree();
      initMap();
      break;
    case 'bitter':
      $('#questionString').html("CAPPUCCINO TIME");
      setDescription('cappuccino');
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/cappuccino.png");
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#buttonOne').hide("flavor");
      $('#buttonTwo').hide("energy");
      cappuccino++;
      database.ref().update({
        cappuccino: cappuccino
      });
      $("#rankingContainer").show();
      topThree();
      initMap();
      break;
    case 'Steamed':
      $('#questionString').html("unsweet or chocolatey?");
      $('#buttonOne').html("unsweet");
      $('#buttonTwo').html("chocolatey");
      break;
    case 'unsweet':
      $('#questionString').html("LATTE TIME");
      setDescription('latte');
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/latte.png");
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#buttonOne').hide("unsweet");
      $('#buttonTwo').hide("chocolatey");
      latte++;
      database.ref().update({
        latte: latte
      });
      $("#rankingContainer").show();
      topThree();
      initMap();
      break;
    case 'chocolatey':
      $('#questionString').html("HAVE A MOCHA");
      setDescription('mocha');
      $('#images').show();
      $('#images').attr("src", "assets/Images/coffeeTypes/mocha.png");
      $("#bgBox").css({"background-color": "white", "opacity": "0.5", "z-index": "-10"});
      $('#buttonOne').hide("unsweet");
      $('#buttonTwo').hide("chocolatey");
      mocha++;
      database.ref().update({
        mocha: mocha
      });
      topThree();
      initMap();
      break;

  }

});

//============================================================= GOOGLE MAPS API ===============================================================

console.log("Correct Map");

var map;
var pos;
var infowindow;
var infoWindowUser;
var interval;
var GeoMarker;
var austin;

function initMap() {

  $("#floating-panel").show();

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

      var marker = new google.maps.Marker({map: map, icon: 'assets/Images/blueDot.png', position: pos});

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
    radius: '5000',
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


// Function that creates the Google Maps Marker
var id = 0;
var destination;
var placeLoc;
var isOpen;



function createMarker(place) {
  placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    // icon: 'coffee-icon-png-24.png',
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
  });

  // console.log("item: " + place.geometry.location);
  console.log(place);

  google.maps.event.addListener(infowindow, 'domready', function() {
    var iwOuter = $('.gm-style-iw');
    var iwBackground = iwOuter.prev();
    // iwBackground.children(':nth-child(2)').css({'display': 'none'});
    // iwBackground.children(':nth-child(4)').css({'display': 'none'});
    // iwOuter.parent().parent().css({left: '115px'});
    // iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    // iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    // iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    var iwCloseBtn = iwOuter.next();
    iwCloseBtn.css({
      opacity: '1', // by default the close button has an opacity of 0.7
      right: '8px', top: '15px', // button repositioning
      border: '7px solid #48b5e9', // increasing button border and new color
      'border-radius': '13px', // circular effect
      'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
    });

    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });



  google.maps.event.addListener(marker, 'click', function() {
    isOpen = place.opening_hours.open_now;

    if (isOpen !== true) {
      isOpen = "Closed";
    } else {
      isOpen = "Open";
    }

    console.log(isOpen);
    var contentString = '<div id="iw-container">' +
                      '<div class="iw-title">' + place.name + '</div>' +
                        '<div class="iw-content">' +
                          '<div id="open">' + isOpen + '</div><br>' +
                          '<div id="rating">' + "Rating: " + place.rating + '</div>' +
                          '<img id="image" src="' + place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) + '"><br>' +
                          '<button id="directions" onclick="getDirections()">' + "Directions" + '</button>' +
                        '</div>' +
                      '</div>' +
                    '</div>';
    destination = place.geometry.location;
    infowindow.setContent(contentString);
    infowindow.open(map, this);
  });
}

var travelMode = 'DRIVING';

function getDirections() {
  $("#textDirections").show();
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 30.2672,
      lng: -97.7431
    }
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('textDirections'));
  document.getElementById('mode').addEventListener('change', function() {
    travelMode = $('#mode').val();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

  calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: pos,
    destination: destination,
    travelMode: travelMode,
    // travelMode: 'DRIVING',
    provideRouteAlternatives: true
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
