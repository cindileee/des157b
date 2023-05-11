(function(){
    "use strict";
    let globalData; 
    
    async function getData(){
    const myDays = await fetch ("data/food.json");
    const data = await myDays.json();
    globalData = data;
    const dayimg = document.querySelector("#dayimg");
    document.querySelector("#daybutton").innerHTML = createButton(data);
    createEvents();
    }


    // var marker1 = L.marker([38.560395, -121.756735]).addTo(map);
    // marker1.bindPopup("Akira").openPopup();

    

    function createButton(data){
        let htmlButton = ""
        const dataPoints = Object.keys(data);
        console.log(dataPoints);
        dataPoints.forEach(function(eachPoint){
            htmlButton += `<button id="${eachPoint}">${eachPoint}</button>`;
        });
        return htmlButton;
    }

    
    function createEvents(){
        const buttons = document.querySelectorAll('button');
    
        for (const button of buttons){
            button.addEventListener('click', function(event){
                const id = event.target.id; 
                console.log(id)
                updateInterface(id, globalData);
            })
        }
    }

    function updateInterface(value, jsonData){
        let text = '';
        text+= `
        <div class="info">
            <div>
                <h2>${jsonData[value].name}</h2>
                <p>${jsonData[value].type}</p>
                <p>${jsonData[value].item}</p>
                <p>${jsonData[value].location}</p>
                <p>${jsonData[value].rating}</p>
            </div>
            <img src="images/${jsonData[value].img}" alt="${jsonData[value].alt}">
            
        </div>
        
        
        
        `

        
    
        document.querySelector('#dayimg').innerHTML = text;


        
    }

    getData();



    var map = L.map('map').setView([38.225336, -122.024495], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

     // var marker1 = L.marker([38.560395, -121.756735]).addTo(map);
    // marker1.bindPopup("Akira").openPopup();


    AOS.init();

})();