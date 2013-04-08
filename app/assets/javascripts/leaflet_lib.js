var LeafletLib = LeafletLib || {};
var LeafletLib = {

    latmin: 90,
    latmax: -90,
    lngmin: 180,
    lngmax: -180,

    initialize: function(element, features, centroid, zoom) {

        LeafletLib.map = L.map(element).setView(new L.LatLng( centroid[0], centroid[1] ), zoom);

        LeafletLib.tiles = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
            key: '88c48b9eab824447beca8aca7bb6e167',
            styleId: 91943
        }).addTo(LeafletLib.map);

        LeafletLib.map.attributionControl.setPrefix('');

        if(typeof features.markers != "undefined"){
          for(var m=0;m<features.markers.length;m++){
            var pt = new L.LatLng( features.markers[m][0], features.markers[m][1] );
            new L.Marker( pt ).addTo( LeafletLib.map );
            this.addBoundedPoint( pt );
          }
        }
        if(typeof features.geojson != "undefined"){
          LeafletLib.geojson = L.geoJson(features.geojson, {
              style: LeafletLib.style
          }).addTo(LeafletLib.map);

          this.addBoundedBox( LeafletLib.geojson.getBounds() );
        }

        this.fitFeatures();

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
        this.latmin = Math.min( this.latmin, latlng.lat );
        this.latmax = Math.max( this.latmax, latlng.lat );
        this.lngmin = Math.min( this.lngmin, latlng.lng );
        this.lngmax = Math.max( this.lngmax, latlng.lng );
    },

    addBoundedBox: function( bounds ){
        this.latmin = Math.min( this.latmin, gj_bounds.getSouth() );
        this.latmax = Math.max( this.latmax, gj_bounds.getNorth() );
        this.lngmin = Math.min( this.lngmin, gj_bounds.getWest() );
        this.lngmax = Math.max( this.lngmax, gj_bounds.getEast() );
    },

    fitFeatures: function(){
        if(this.latmax > this.latmin){
          var bounds = new L.LatLngBounds(
                      new L.LatLng( this.latmin, this.lngmin ),
                      new L.LatLng( this.latmax, this.lngmax ));

          LeafletLib.map.fitBounds( bounds.pad(.2) );
        }
    }
}
