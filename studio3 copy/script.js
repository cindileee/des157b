(function(){
    'use strict';

    // var map = L.map('map').setView([38.155077, -121.705173], 9);

    var map = L.map('map').setView([38.225336, -122.024495], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

    var marker1 = L.marker([38.560395, -121.756735]).addTo(map);

    var marker2 = L.marker([37.801248, -122.273951]).addTo(map);

    var marker3 = L.marker([37.784374, -122.417864]).addTo(map);

    var marker4 = L.marker([37.795328, -122.393487]).addTo(map);

    var marker5 = L.marker([37.870668, -122.267984]).addTo(map);

    var marker6 = L.marker([38.543826, -121.746271]).addTo(map);

    var marker7 = L.marker([37.785756, -122.431080]).addTo(map);

    var marker8 = L.marker([38.541421, -121.741516]).addTo(map);

    var marker9 = L.marker([37.784377, -122.406216]).addTo(map);

    var marker10 = L.marker([38.542894, -121.740521]).addTo(map);






    // var circle = L.circle([37.775278, -122.230156], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(map);

    // var polygon = L.polygon([
    //     [37.800133, -122.273785],
    //     [37.802162, -122.272443],
    //     [37.799438, -122.265313],
    //     [37.796687, -122.267154]
    // ]).addTo(map);





    // marker1.bindPopup("Akira").openPopup();
    // marker2.bindPopup("Blue Bottle").openPopup();
    // marker3.bindPopup("Sweet Glory").openPopup();
    // marker4.bindPopup("Dandelion Chocolate").openPopup();
    // marker5.bindPopup("Gadani").openPopup();
    // marker6.bindPopup("Guads Tacos & Beer").openPopup();
    // marker7.bindPopup("Matcha Maiko").openPopup();
    // marker8.bindPopup("Mikuni").openPopup();
    // marker9.bindPopup("Pink Pink Tea Shoppe").openPopup();
    // marker10.bindPopup("Uniboil").openPopup();




    marker1.bindPopup("Akira");
    marker2.bindPopup("Blue Bottle");
    marker3.bindPopup("Sweet Glory");
    marker4.bindPopup("Dandelion Chocolate");
    marker5.bindPopup("Gadani");
    marker6.bindPopup("Guads Tacos & Beer");
    marker7.bindPopup("Matcha Maiko");
    marker8.bindPopup("Mikuni");
    marker9.bindPopup("Pink Pink Tea Shoppe");
    marker10.bindPopup("Uniboil");






    // circle.bindPopup("Cindy's Home");
    // polygon.bindPopup("Where I Grew Up");

    // var popup = L.popup()
    // .setLatLng([37.804363, -122.271111])
    // .setContent("Cindy's Childhood")
    // .openOn(map);

    // function onMapClick(e) {
    //     alert("You clicked the map at " + e.latlng);
    // }
    
    // map.on('click', onMapClick);
    
    // var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }

    // map.on('click', onMapClick);










   



    //get my own json data
    async function getData(){
        const watched = await fetch('data/food.json');
        const data = await watched.json();
        const values = Object.values(data);
        console.log(values);
        document.querySelector('#container').innerHTML = outputHTML(values);

    }
    
    //for each movie, it will show the name, watch date, and my rating
    function outputHTML(data){
        let html = '';
        data.forEach( function(eachEntry){
           
           
            html += `<img src ="images/${eachEntry.img}" class="titleimg" >`;
            html += '<div class="info">';
            html += `<h2>${eachEntry.title}</h2>`;

            html += '<div id="outside">';
            html += '</div>';

            html += `<p id="me1">Watch Date: ${eachEntry.date}</p>`;
            html += `<p id="me2">Cindy's Rating: ${eachEntry.rating}/5</p>`;
            

            html += '</div>';
           


            

            
        } );
        
        
        return html;
        
        
    } 


   
  
    
    getData();


    
    

})(); // end IIFE