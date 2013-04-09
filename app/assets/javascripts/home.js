// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var searchFeature = function(){
  LeafletLib.defaultCity = "Chicago, IL";
  LeafletLib.searchRadius = $("#search_radius").val();

  var raw_address = $("#search_address").val().toLowerCase();
  raw_address = raw_address.replace(" n ", " north ");
  raw_address = raw_address.replace(" s ", " south ");
  raw_address = raw_address.replace(" e ", " east ");
  raw_address = raw_address.replace(" w ", " west ");

  LeafletLib.searchAddress( raw_address );
};

$("#search").on("click", searchFeature);
$("#search_address").on("keydown", function(e){
  if(e.keyCode == 13){
    searchFeature();
  }
});

$("#find_me").on("click", function(e){
  LeafletLib.searchRadius = $("#search_radius").val();
  LeafletLib.geolocate();
});
