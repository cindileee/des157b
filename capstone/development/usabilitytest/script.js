(function() {
  'use strict';
  alert('Hello, fellow tester! Welcome to the Davis Centennial Seal Treasure Hunt. \r Here, you’ll get to explore and learn more about different places around the UC Davis campus. \r Here are some tasks we prepared for you: \r1. Click on a marker to learn more about it. \r2. Change to the Seal Page. \r3. Upload a photo to the public gallery.')


  var map = L.map('map').setView([38.541660,  -121.748100], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
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
        var SealIcon = L.Icon.extend({
          options: {
              // find a shadow, adjust size details
              // shadowUrl: 'images/leaf-shadow.png',
              iconSize:     [100, 100],
              shadowSize:   [50, 64],
              iconAnchor:   [22, 94],
              shadowAnchor: [4, 62],
              popupAnchor:  [-3, -76]
          }
      });

      var mondaviIcon = new SealIcon({iconUrl: 'images/mondavi.png'}),
  eggIcon = new SealIcon({iconUrl: 'images/egghead.png'});

        var markerInfo = markerData[key];
        var coordinates = markerInfo.coordinates.split(',');
        //create markers 
        var marker = L.marker(coordinates, {icon:mondaviIcon}).addTo(map);
        markers.push(marker);

        //popup on map when a marker is clicked 
        marker.bindPopup(markerInfo.name);

        
      });

      // Function to handle marker click event and display pop-up below the map
      function displayPopup(markerInfo) {

        var popupContent = `
           
          <div id="item" data-aos="fade-up" data-aos-duration="1000">
            
            <img src="images/${markerInfo.img}" class="titleimg">
            <div class ="info">
              
                <h3>${markerInfo.name}</h3>
                <p><strong>Address:</strong> ${markerInfo.location}</p>
                
                <p id="description">${markerInfo.description}</p>
                
                <h4>Public Gallery</h4>
           
                
                
               
                <div id="imgScroll">
                <img src="images/1.png" alt="user ">
                <img src="images/2.png" alt="Horizontal photo of Egghead at a glance">
                <img src="images/3.png" alt="Horizontal photo of Egghead at a glance">
                <img src="images/4.png" alt="Horizontal photo of Egghead at a glance">
            </div>
            <button id="photoBtn">Add Your Own Photo</button>


            <form id="upload">
              <label for="fileupload">Upload a File</label>
              <input type="file" id="fileupload">
  
              <input type="submit" value="send file" id="submitBtn">
          </form>
          <div id="uploaded-img">
         
          </div>


            


               <div id="fun">
                <h4>Fun Facts</h4>
                  <ol>
                      <li>${markerInfo.fun1}</li>
                      <li>${markerInfo.fun2}</li>
                      <li>${markerInfo.fun3}</li>
                  </ol>
               </div>
                
      </section>
               
            </div>
          </div>
        `;

       
        document.querySelector('#container').innerHTML = popupContent;
        
       
        // let markername = markerInfo.name;
        // document.querySelector('#markername').innerHTML = markername;

        // let markerlocation = `<span><strong>Address:</strong> ${markerInfo.location}</span>`;
        // document.querySelector('#markerlocation').innerHTML = markerlocation;



        
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




//App ID and JS Key from B4A
Parse.initialize("73PmwhWYpnQSgxbIIrZU26yl7lmdQGMPc4q8sC1q","WTaWw3gbdA39gMVJjw3BVJjhud8oML2vLFbpOIUe");
// Parse server
Parse.serverURL = 'https://parseapi.back4app.com/';

// document.querySelector('#upload').addEventListener('submit', function(event){
document.querySelector('#container').addEventListener('submit', function(event){
  event.preventDefault();

  const fileUploadControl = document.querySelector('#fileupload');
  if (fileUploadControl.files.length > 0) {
      const file = fileUploadControl.files[0];
      const name = fileUploadControl.files[0].name;
      const type = fileUploadControl.files[0].type;
      const size = fileUploadControl.files[0].size;
      if(size < 100000 && type == 'image/jpeg' || type == 'image/png' || type == 'image/webp'){
        uploadPhoto(name, file);

      } else {
        alert('the file is too big or is not a .jpg or .png file');
      }
  }
});

async function uploadPhoto(name, file){
  const newPhoto = new Parse.Object('photos');
  newPhoto.set('filename', name);
  newPhoto.set('file', new Parse.File(name, file));
  try {
    const result = await newPhoto.save();
    // get the ID of the photo saved.
    console.log(result.id);
    // A function that runs a new query to get info about the photo you just added
    getNewPhoto(result.id);
  } catch (error) {
    console.error('Error while uploading the photo: ', error);
  }
}

async function getNewPhoto(photoId){
// which "object" are we dealing with (database table)
const records = Parse.Object.extend('photos');
// make a new query
const query = new Parse.Query(records);
// Find the record you just added
query.equalTo("objectId", photoId);
try{
  // results holds the whole record and meta data about the record
  const results = await query.find();
  // The .get() method gets a speficif field. The url() method is special for files
  const photoURL = results[0].get('file').url();
  // get the photo file name from the filename field
  const photoName = results[0].get('filename');
  // pass both values into the showUploadedPhoto function
  showUploadedPhoto(photoURL, photoName);
} catch (error) {
    console.error('Error while getting photo', error);
} 
}

// This function now has two parameters
function showUploadedPhoto(photoURL, photoName){
// single quotes replaced with tick marks to use the photoName

let html = `<p>You just uploaded ${photoName}:</p>`;
html += `<img src="${photoURL}" alt="${photoName}" alt = "${photoName}">`;
// document.querySelector('#uploaded-img').innerHTML = html;
document.querySelector('#imgScroll').innerHTML = html;
}
})();




// document.querySelector("#photoBtn").addEventListener("click", function(event){
//   event.preventDefault();
//   upload.className = "show";
  
  
// });











// //Erika's code

// // Routing
// let walking;
// document.querySelector('#drive').addEventListener('click', function(){
//     walking = false;
//     route();
// });
// document.querySelector('#walk').addEventListener('click', function(){
//     walking = true;
//     route();
// });

// // watch pso
// let id;
// let target;
// let options;

// function reach(pos) {
//     const crd = pos.coords;

//     if (target.lat <= crd.latitude + 0.00025 && target.lat >= crd.latitude - 0.00025 && target.long <= crd.longitude + 0.00005 && target.long >= crd.longitude - 0.00005) {
//         console.log("Congratulations, you reached the target");
//         document.querySelector('#arrival').className = 'showing';
//         navigator.geolocation.clearWatch(id);
//         } else {
//             // console.log(`nope lat:${crd.latitude}, tarLat: ${target.lat}`);
//             // console.log(`nope long:${crd.longitude}, tarLong: ${target.long}`);
//         }
//     }

// function error(err) {
//     console.error(`ERROR(${err.code}): ${err.message}`);
// }

// target = {
//     lat: 38.53950,
//     long: -121.75000
// }

// // ~~~

// function arrival() {
//     id = navigator.geolocation.watchPosition(reach, error, options);
// }



// function route() {
//     arrival();
    
//     // Walking directions using MAPBOX
//     var wrouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
//         profile: 'mapbox/walking',
//         urlParameters: {
//             vehicle: 'foot'
//         }
//     });

//     // Driving directions using MAPBOX
//     var drouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
//         profile: 'mapbox/driving',
//         urlParameters: {
//             vehicle: 'car'
//         }});

//         // Determine which route...
//     let thisRoute;
//     let mapbox;

//     if (walking == true) {
//         thisRoute = wrouter;
//         mapbox = 'mapbox/walking';
//     } else {
//         thisRoute = drouter;
//         mapbox = 'mapbox/driving';
//     }

//     // If user allows geolocation...
//     if ("geolocation" in navigator) {

//         // loading sign
//         document.querySelector('#load').className = 'showing';
//         setTimeout(function(){
//             document.querySelector('#load').className = 'hidden';
//         }, 1000)

//         setTimeout(function(){
//             document.querySelector('#load').className = 'hidden';
//         }, 1000)

//         // Dynamic Footprint marker
//         const footprint = setInterval(function(){
//             navigator.geolocation.getCurrentPosition((position) => {
//                 let latitude = position.coords.latitude;
//                 let longitude = position.coords.longitude; 

//                 let you = L.marker([latitude, longitude], {icon: eggIcon}).addTo(map).bindPopup("YOU");

//                 // Remove markers when done??? 
//                 document.querySelector('#end').addEventListener('click', function(){
//                     map.removeLayer(you);
//                 })
//             })
//         }, 1000)

//          // Walking route applied using LEAFBOX OUTING MACHINE
//          navigator.geolocation.getCurrentPosition((position) => {
//             let slatitude = position.coords.latitude;
//             let slongitude = position.coords.longitude;

//             var routingWay =  L.Routing.control({
//                 waypoints: [
//                     L.latLng(38.53950, -121.75000),
//                     L.latLng(slatitude, slongitude)
//                 ],
//                 router: thisRoute,
//                 profile: mapbox
//             }).addTo(map);

//             // Remove route when done???
//             document.querySelector('#end').addEventListener('click', function(){
//                 map.removeControl(routingWay)
//             })
           
//         })
                
//         // End Interval when done???
//         document.querySelector('#end').addEventListener('click', function(){
//             clearInterval(footprint);
//         })
        

        

//       } else {
//         console.log('Sorry, your browser does not support Geolocation API')
//       }
// }

// document.querySelector('#arrival button').addEventListener('click', function(){
//     document.querySelector('#arrival').className = 'hidden';
// })




document.querySelector('#sealBtn').addEventListener('click', function(){
  document.querySelector('#badgePage').className = 'showing';
})

document.querySelector('#mapBtn').addEventListener('click', function(){
document.querySelector('#badgePage').className = 'hidden';
})

document.querySelector('#exitBtn').addEventListener('click', function(){
console.log("helloooo");
// document.querySelector('#container').className = 'hidden';
})








