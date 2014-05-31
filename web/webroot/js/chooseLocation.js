var initialLocation;
var paris = new google.maps.LatLng(48.858165,2.294251);
var browserSupportFlag =  new Boolean();
var markerUser;
var map;

function initialize() {
   var mapOptions = {
      zoom: 13,
      disableDefaultUI:true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // Try HTML5 geolocation
   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
         function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(pos);
            markerUser = marker(map.getCenter());
            setCoords();
         },
         function() {
            handleNoGeolocation(true);
            markerUser = marker(map.getCenter());
            setCoords();
         }
      );
   }
   else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
      var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(pos);
      markerUser = marker(map.getCenter());
   }
}

function marker(position){
      var marker = new google.maps.Marker({
         map: map,
         position: position,
         animation: google.maps.Animation.DROP,
         draggable: false,
         title: 'Choisissez votre position !'
      }
   );
   google.maps.event.addListener(marker, 'mouseup', function() {
      setCoords();
   });
   return marker;
}

function handleNoGeolocation(errorFlag) {
   var options = {
      map: map,
      position: paris,
   };
   map.setCenter(options.position);
   map.setZoom(12)
}

function setCoords(){
   document.getElementsByName("locationX")[0].value = markerUser.position.lat();
   document.getElementsByName("locationY")[0].value = markerUser.position.lng();
}

google.maps.event.addDomListener(window, 'load', initialize);