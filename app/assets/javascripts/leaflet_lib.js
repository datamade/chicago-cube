var LeafletLib = LeafletLib || {};
var LeafletLib = {

    initialize: function(element, features, centroid, zoom) {

        LeafletLib.map = L.map(element).setView(new L.LatLng( centroid[0], centroid[1] ), zoom);

        LeafletLib.tiles = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
            key: '88c48b9eab824447beca8aca7bb6e167',
            styleId: 91943
        }).addTo(LeafletLib.map);

        LeafletLib.map.attributionControl.setPrefix('');


        var latmin = 90;
        var latmax = -90;
        var lngmin = 180;
        var lngmax = -180;
        if(typeof features.markers != "undefined"){
          for(var m=0;m<features.markers.length;m++){
            new L.Marker( new L.LatLng( features.markers[m][0], features.markers[m][1] ) )
              .addTo( LeafletLib.map );
            latmin = Math.min(latmin, features.markers[m][0]);
            latmax = Math.max(latmax, features.markers[m][0]);
            lngmin = Math.min(lngmin, features.markers[m][1]);
            lngmax = Math.max(lngmax, features.markers[m][1]);
          }
        }
        if(typeof features.geojson != "undefined"){
          LeafletLib.geojson = L.geoJson(features.geojson, {
              style: LeafletLib.style
          }).addTo(LeafletLib.map);

          var gj_bounds = LeafletLib.geojson.getBounds();
          latmin = Math.min(latmin, gj_bounds.getSouth() );
          latmax = Math.max(latmax, gj_bounds.getNorth() );
          lngmin = Math.min(lngmin, gj_bounds.getWest() );
          lngmax = Math.max(lngmax, gj_bounds.getEast() );
        }

        if(latmax > latmin){
          LeafletLib.map.fitBounds( new L.LatLngBounds(
            new L.LatLng( latmin, lngmin ),
            new L.LatLng( latmax, lngmax )
          ));
        }
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
    }
}
