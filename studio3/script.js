(function() {
    'use strict';

    var map = L.map('map').setView([38.195038, -122.006577], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  
    // Define an empty array to store marker objects
    var markers = [];
  
    // Fetch the food.json file
    fetch('data/food.json')
      .then(response => response.json())
      .then(data => {
        // Populate the markerData object with the fetched data
        var markerData = data;
  
        // Create markers 
        Object.keys(markerData).forEach(function(key) {
          var markerInfo = markerData[key];
          var coordinates = markerInfo.coordinates.split(',');
          //create markers 
          var marker = L.marker(coordinates).addTo(map);
          markers.push(marker);

          //popup on map when a marker is clicked 
          marker.bindPopup(markerInfo.name);

          
        });
  
        // Function to handle marker click event and display pop-up below the map
        function displayPopup(markerInfo) {
          var popupContent = `
             <h2>Restaurant Information</h2>
            <div id="item" data-aos="fade-right" data-aos-duration="1000">
    
              <img src="images/${markerInfo.img}" class="titleimg">
              <div class ="info">
                
                  <h3>${markerInfo.name}</h3>
             <div class ="tag">
                <p id="tag"> ${markerInfo.type}</p>
            </div>
                  <p><strong>Dish:</strong> ${markerInfo.item}</p>
                  <p><strong>Address:</strong> ${markerInfo.location}</p>
                  <p><strong>Cindy's Rating:</strong> ${markerInfo.rating}</p>
              </div>
            </div>
          `;
          document.querySelector('#container').innerHTML = popupContent;
          
        }

  
        // Attach click event listeners to markers
        markers.forEach(function(marker, index) {
          marker.addEventListener('click', function() {
            var markerInfo = markerData[Object.keys(markerData)[index]];
            displayPopup(markerInfo);


            
          });
        });
      })
      .catch(error => console.error('Error fetching data:', error));
      

      //animation on scroll
      AOS.init();
  })();
  
  