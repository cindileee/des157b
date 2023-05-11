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
        text+= `<h2>${jsonData[value].name}</h2>
        <p>${jsonData[value].type}</p>
        <p>${jsonData[value].item}</p>
        <img src="images/${jsonData[value].img}" alt="${jsonData[value].alt}">
        <p>${jsonData[value].location}</p>
        <p>${jsonData[value].rating}</p>`
    
        document.querySelector('#dayimg').innerHTML = text;
    }

    getData();
})();