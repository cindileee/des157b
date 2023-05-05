(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([37.804363, -122.271111], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([37.800449, -122.271304]).addTo(map);

    var circle = L.circle([37.775278, -122.230156], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    var polygon = L.polygon([
        [37.800133, -122.273785],
        [37.802162, -122.272443],
        [37.799438, -122.265313],
        [37.796687, -122.267154]
    ]).addTo(map);

    marker.bindPopup("<b>My old workplace").openPopup();
    circle.bindPopup("Cindy's Home");
    polygon.bindPopup("Where I Grew Up");

    var popup = L.popup()
    .setLatLng([37.804363, -122.271111])
    .setContent("Cindy's Childhood")
    .openOn(map);

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }
    
    map.on('click', onMapClick);
    
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
}());