(function(){
    'use strict';

    // var map = L.map('map').setView([38.155077, -121.705173], 9);

     // var marker1 = L.marker([38.560395, -121.756735]).addTo(map);
        // marker1.bindPopup("Akira").openPopup();


    var map = L.map('map').setView([38.225336, -122.024495], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

    const data = {
        one: {
            coordinates: [38.560395, -121.756735],
            name : "Akira",
            item: "Grapefruit mojito",
            location : "620 W Covell Blvd Ste A Davis, CA 95616",
            type: "boba",
            img: "akira.jpeg",
            rating: "3.5/5"
        },

        two: {
            name : "Blue Bottle",
            item: "Hot Mocha",
            location : "480 9th St Oakland, CA 94607",
            coordinates : [37.801248, -122.273951],
            type: "coffee",
            img: "bluebottle.jpeg",
            rating: "4.5/5"
        },
        three: {
            name: "Sweet Glory",
            item: "Mango Thousand Layer Cake",
            location: "721 Larkin St San Francisco, CA 94109",
            coordinates: [37.784374, -122.417864],
            type: "dessert",
            img: "cake.jpeg",
            rating: "3.5/5"
        },
        four: {
            name: "Dandelion Chocolate",
            item: "Hot Mexican Mocha",
            location: "1 Ferry Building Shop 14 Ferry Building San Francisco, CA 94111",
            coordinates: [37.795328, -122.393487],
            type: "coffee",
            img: "dandelionchocolate.jpeg",
            rating: "3.5/5"
        },
        five: {
            name: "Gadani",
            item: "Rose Matcha Latte",
            location: "139 Berkeley Sq Berkeley, CA 94704",
            coordinates: [37.870668, -122.267984],
            type: "matcha",
            img: "gadani.jpeg",
            rating: "4/5"
        },
        six: {
            name: "Guads Tacos & Beer",
            item: "Burrito Bowl with Asada",
            location: "231 3rd St Davis, CA 95616",
            coordinates: [38.543826, -121.746271],
            type: "Mexican",
            img: "guads.jpeg",
            rating: "4/5"
        },
        seven: {
            name: "Matcha Maiko",
            item: "Strawberry & Matcha Swirl Soft Serve",
            location: "1581 Webster St San Francisco, CA 94115",
            coordinates: [37.785756, -122.431080],
            type: "ice cream",
            img: "matcha.jpeg",
            rating: "4/5"
        },
        eight: {
            name: "Mikuni",
            item: "Chirashi Bowl",
            location: "500 1st St Ste 19 Davis, CA 95616",
            coordinates: [38.541421, -121.741516],
            type: "Japanese",
            img: "mikuni.jpeg",
            rating: "4.5/5"
        },
        nine: {
            name: "Pink Pink Tea Shoppe",
            item: "Matcha Tornado",
            location: "845 Market St Ste FE-11 San Francisco, CA 94103",
            coordinates: [37.784377, -122.406216],
            type: "boba",
            img: "peach.jpeg",
            rating: "4/5"
        },
        ten: {
            name: "Uniboil",
            item: "Beef Hot Pot",
            location: "132 E St Davis, CA 95616",
            coordinates: [38.542894, -121.740521],
            type: "hot pot",
            img: "uniboil.jpeg",
            rating: "4.5/5"
        }
    }


    for (let key in data){
        const foodPopup = data[key];

        
        

        L.marker(foodPopup.coordinates,{
            name: foodPopup.name,
    
        })
        .bindPopup(`
            <span class="popup">
            <div class="info">
                <h2>${foodPopup.name}</h2>
                <p>${foodPopup.type}</p>
                <p>${foodPopup.item}</p>
                <p>${foodPopup.location}</p>
                <p>${foodPopup.rating}</p>
                
            </div>
            
                
                <img src = "images/${foodPopup.img}">
            </span>

            
            
            
        `)
        .addTo(map)
        
        
    }

    

    


        
   





    





})(); // end IIFE