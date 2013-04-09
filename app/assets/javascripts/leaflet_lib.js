var LeafletLib = LeafletLib || {};
var LeafletLib = {

    latmin: 90,
    latmax: -90,
    lngmin: 180,
    lngmax: -180,
    searchRadius: 805,
    defaultCity: "",

    initialize: function(element, features, centroid, zoom) {

        LeafletLib.map = L.map(element).setView(new L.LatLng( centroid[0], centroid[1] ), zoom);

        LeafletLib.tiles = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
            key: '88c48b9eab824447beca8aca7bb6e167',
            styleId: 91943
        }).addTo(LeafletLib.map);

        LeafletLib.map.attributionControl.setPrefix('');
        L.Icon.Default.imagePath = "/assets/images/";

        if(typeof features.markers != "undefined"){
          for(var m=0;m<features.markers.length;m++){
            var pt = new L.LatLng( features.markers[m][0], features.markers[m][1] );
            new L.Marker( pt ).addTo( LeafletLib.map );
            LeafletLib.addBoundedPoint( pt );
          }
        }
        if(typeof features.geojson != "undefined"){
          LeafletLib.geojson = L.geoJson(features.geojson, {
              style: LeafletLib.style
          }).addTo(LeafletLib.map);

          LeafletLib.addBoundedBox( LeafletLib.geojson.getBounds() );
        }

        LeafletLib.fitFeatures();

    },

    style: function(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: '#FD8D3C'
        };
    },

    addBoundedPoint: function( latlng ){
        LeafletLib.latmin = Math.min( LeafletLib.latmin, latlng.lat );
        LeafletLib.latmax = Math.max( LeafletLib.latmax, latlng.lat );
        LeafletLib.lngmin = Math.min( LeafletLib.lngmin, latlng.lng );
        LeafletLib.lngmax = Math.max( LeafletLib.lngmax, latlng.lng );
    },

    addBoundedBox: function( bounds ){
        LeafletLib.latmin = Math.min( LeafletLib.latmin, gj_bounds.getSouth() );
        LeafletLib.latmax = Math.max( LeafletLib.latmax, gj_bounds.getNorth() );
        LeafletLib.lngmin = Math.min( LeafletLib.lngmin, gj_bounds.getWest() );
        LeafletLib.lngmax = Math.max( LeafletLib.lngmax, gj_bounds.getEast() );
    },

    fitFeatures: function(){
        if(LeafletLib.latmax > LeafletLib.latmin){
          var bounds = new L.LatLngBounds(
                      new L.LatLng( LeafletLib.latmin, LeafletLib.lngmin ),
                      new L.LatLng( LeafletLib.latmax, LeafletLib.lngmax ));

          LeafletLib.map.fitBounds( bounds.pad(.2) );
        }
    },

    squareAround: function(latlng, distance){
        var north = latlng.lat + distance * 0.000008;
        var south = latlng.lat - distance * 0.000008;
        var east = latlng.lng + distance * 0.000009;
        var west = latlng.lng - distance * 0.000009;
        var bounds = [[south, west], [north, east]];
        var sq = new L.rectangle(bounds);
        return sq;
    },

    searchAddress: function(address){
        if(LeafletLib.defaultCity && LeafletLib.defaultCity.length){
          var checkaddress = address.toLowerCase();
          var checkcity = LeafletLib.defaultCity.split(",")[0].toLowerCase();
          if(checkaddress.indexOf(checkcity) == -1){
            address += ", " + LeafletLib.defaultCity;
          }
        }
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "http://nominatim.openstreetmap.org/search/" + encodeURIComponent(address) + "?format=json&json_callback=LeafletLib.returnAddress";
        document.body.appendChild(s);
    },

    returnAddress: function(response){
        //console.log(response);
        if(!response.length){
          alert("Sorry, no results found for that location.");
          return;
        }

        var first = response[0];
        var foundLocation = new L.LatLng(first.lat, first.lon);
        if(typeof LeafletLib.sq != "undefined" && LeafletLib.sq){
          LeafletLib.map.removeLayer(LeafletLib.sq);
        }

        LeafletLib.sq = LeafletLib.squareAround(foundLocation, LeafletLib.searchRadius);
        LeafletLib.sq.setStyle({
          strokeColor: "#4b58a6",
          strokeOpacity: 0.3,
          strokeWeight: 1,
          fillColor: "#4b58a6",
          fillOpacity: 0.1
        });
        LeafletLib.map.addLayer(LeafletLib.sq);
        LeafletLib.map.fitBounds( LeafletLib.sq.getBounds().pad(0.2) );
    },

    geolocate: function(){
        // Try W3C Geolocation
        var foundLocation;
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            foundLocation = new L.LatLng(position.coords.latitude * 1.0, position.coords.longitude * 1.0);

            if(typeof LeafletLib.sq != "undefined" && LeafletLib.sq){
              LeafletLib.map.removeLayer(LeafletLib.sq);
            }

            LeafletLib.sq = LeafletLib.squareAround(foundLocation, LeafletLib.searchRadius);
            LeafletLib.sq.setStyle({
              strokeColor: "#4b58a6",
              strokeOpacity: 0.3,
              strokeWeight: 1,
              fillColor: "#4b58a6",
              fillOpacity: 0.1
            });
            LeafletLib.map.addLayer(LeafletLib.sq);
            LeafletLib.map.fitBounds( LeafletLib.sq.getBounds().pad(0.2) );

            //console.log(foundLocation);
            //if(typeof this.scircle != 'undefined' && this.scircle){
            //  map.removeLayer( this.scircle );
            //}
            //console.log(foundLocation);
            //this.scircle = new L.Circle([foundLocation.lat, foundLocation.lng], this.searchRadius * 1);
            //this.scircle.addTo(LeafletLib.map);
            //LeafletLib.map.fitBounds( this.scircle.getBounds().pad(0.2) );
          }, null);
        }
        else {
          alert("Sorry, we could not find your location.");
        }
    }
}
