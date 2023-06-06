(function(){
    'use strict';
    console.log('reading js');

    // // USER TESING ONLY
    // document.querySelector('#landing button').addEventListener('click', function(){
    //     document.querySelector('#landing').className = 'hidden';
    // })
    

    // City of Davis Origin Point for Map (38.545, -121.74 13.5)
    var map = L.map('map').setView([38.54, -121.753], 15);

    // Open street Map Tiling
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(map);

     // Define an empty array to store marker objects
     var markers = [];
  
     // Fetch the markers.json file
     fetch('data/markers.json')
       .then(response => response.json())
       .then(data => {
         // Populate the markerData object with the fetched data
         var markerData = data;
   
         // Create markers 
         Object.keys(markerData).forEach(function(key) {

            // Custom Icon deails
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

           var markerInfo = markerData[key];

           // Marker Coords
           var coordinates = markerInfo.coordinates.split(',');

           // Create Custom Markers
           var customIcon = markerInfo.markerPhoto.split();
           var icons = new SealIcon({iconUrl: customIcon});            
           var marker = L.marker(coordinates, {icon: icons}).addTo(map);
           markers.push(marker);
 
           // Marker Popup (do we really need this?)
        //    marker.bindPopup(markerInfo.name);
 
         });
   
         // Function to handle marker click event and display pop-up below the map
         function displayPopup(markerInfo) {
        
        let intro = `
        
        <section id="intro">
            <img src="images/${markerInfo.img}" class="titleimg">
            <div id="locate">
                <h2>${markerInfo.name}</h2>
                <img id="locator" src="images/router.png">
            </div>
            <h4>Address</h4>
            <p id="address">${markerInfo.location}</p>
            <h4>Description</h4>
            <p id="description">${markerInfo.description}</p>
        </section>

        
        
        `;

        document.querySelector('#intro').innerHTML = intro;

        let gallery = `
        
        `;

        document.querySelector('#imgScroll').innerHTML = gallery;

        let fun = `
            <h3>Fun Facts</h3>
                <ol>
                    <li>${markerInfo.fun1}</li>
                    <li>${markerInfo.fun2}</li>
                    <li>${markerInfo.fun3}</li>
                </ol>
        `;

        document.querySelector('#edu').innerHTML = fun;

        let sealText = `
            <h3>Seal</h3>
            <p id="description">${markerInfo.seal}</p>
                    
        `;

        document.querySelector('#sealInfo').innerHTML = sealText;

        getPhotos();


         }
   
         // Show popup when markers are clicked
         markers.forEach(function(marker, index) {
            marker.addEventListener('click', function() {
                var markerInfo = markerData[Object.keys(markerData)[index]];
                document.querySelector('#container').className = 'showing';
                displayPopup(markerInfo);
            
                //  Hide popup when outside of popup is clicked 
                document.querySelector('#closePopup').addEventListener('click', function(){
                    document.querySelector('#container').className = 'hidden';
                });

                //locator business
                document.querySelector('#locator').addEventListener('click', function(){
                    walking = true;
                    document.querySelector('#container').className = 'hidden';
                    route();
                });
           });
         });

        

       })
       .catch(error => console.error('Error fetching data:', error));
       
 
       // Animation on scroll
       AOS.init();

    // Static Routing
    let walking;

    

   

    // Functions and vriables for Arrival() Function
    let id;
    let target;
    let options;

    function reach(pos) {
        const crd = pos.coords;

        if (target.lat <= crd.latitude + 0.00025 && target.lat >= crd.latitude - 0.00025 && target.long <= crd.longitude + 0.00005 && target.long >= crd.longitude - 0.00005) {
            console.log("Congratulations, you reached the target");
            document.querySelector('#arrival').className = 'showing';
            navigator.geolocation.clearWatch(id);
            } else {
                // console.log(`nope lat:${crd.latitude}, tarLat: ${target.lat}`);
                // console.log(`nope long:${crd.longitude}, tarLong: ${target.long}`);
            }
        }

    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
    }

    // Currently on the library front's location
    target = {
        lat: 38.53950,
        long: -121.75000
    }

    // Shows Check-in Message when at location
    function arrival() {
        id = navigator.geolocation.watchPosition(reach, error, options);
    }

    function route() {
        arrival();
        
        // Walking directions using MAPBOX
        var wrouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
            profile: 'mapbox/walking',
            urlParameters: {
                vehicle: 'foot'
            }
        });

        // Driving directions using MAPBOX
        var drouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
            profile: 'mapbox/driving',
            urlParameters: {
                vehicle: 'car'
            }});

        // Determine which route...
        let thisRoute;
        let mapbox;

        if (walking == true) {
            thisRoute = wrouter;
            mapbox = 'mapbox/walking';
        } else {
            thisRoute = drouter;
            mapbox = 'mapbox/driving';
        }

        // If user allows geolocation...
        if ("geolocation" in navigator) {

            // Loading sign...
            document.querySelector('#load').className = 'showing';
            setTimeout(function(){
                document.querySelector('#load').className = 'hidden';
            }, 2500)


            // Dynamic Footprint marker
            const footprint = setInterval(function(){
                navigator.geolocation.getCurrentPosition((position) => {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude; 

                    var feetIcon = L.Icon.extend({
                        options: {
                            // find a shadow, adjust size details
                            // shadowUrl: 'images/leaf-shadow.png',
                            iconSize:     [60, 60],
                            shadowSize:   [50, 64],
                            iconAnchor:   [22, 94],
                            shadowAnchor: [4, 62],
                            popupAnchor:  [-3, -76]
                        }
                    })

                    var stepIcon = new feetIcon({iconUrl: 'images/steps.png'})

                    let you = L.marker([latitude, longitude], {icon: stepIcon}).addTo(map).bindPopup("YOU");

                    // Remove markers when done 
                    document.querySelector('#arrival button').addEventListener('click', function(){
                        map.removeLayer(you);
                    })
                })
            }, 2500)

             // Route applied using LEAFBOX ROUTING MACHINE
             navigator.geolocation.getCurrentPosition((position) => {
                let slatitude = position.coords.latitude;
                let slongitude = position.coords.longitude;

                var routingWay =  L.Routing.control({
                    waypoints: [
                        L.latLng(38.53950, -121.75000),
                        L.latLng(slatitude, slongitude)
                    ],
                    router: thisRoute,
                    profile: mapbox
                }).addTo(map);

                // Remove route when done
                document.querySelector('#arrival button').addEventListener('click', function(){
                    map.removeControl(routingWay)
                })
               
            })
                    
            // End Interval when done
            document.querySelector('#arrival button').addEventListener('click', function(){
                clearInterval(footprint);
            })

          } else {
            console.log('Sorry, your browser does not support Geolocation API')
          }
    }

    document.querySelector('#arrival button').addEventListener('click', function(){
        document.querySelector('#arrival').className = 'hidden';
        document.querySelector('#container').className = 'showing';
    })

    // document.querySelector('#open').addEventListener('click', function(){
    //     console.log('hello');
    //     document.querySelector('#openImg').className = 'showing';
       
    // })

    document.querySelector('#photoBtn').addEventListener('click', function(){
        console.log('hello');
        document.querySelector('#openImg').className = 'showing';
        document.querySelector('#container').className = 'hidden';
       
    })


    // BADGES
    document.querySelector('#mapBtn').addEventListener('click', function(){
        document.querySelector('#badgePage').className = 'hidden';
    })

    document.querySelector('#badgeBtn').addEventListener('click', function(){
        document.querySelector('#badgePage').className = 'showing';
        document.querySelector('#item').className = 'hidden';
    })



    // LOCAL STORAGE STUFF HERE

    // If no local storage data has been set, default to false
    if (localStorage.getItem('bool') == null) {
        localStorage.setItem('bool', 'false');
    }
    

    // Print to console whether local storage data was stored
    function loca() { 
        console.log('you clicked test,', localStorage.getItem('bool'));
        if (localStorage.getItem('bool') == 'true') {
            console.log('got it')
            document.querySelector('#eggy').src = "images/egghead.png";
            document.querySelector('#davi').src = "images/mondavi.png";
        } else {
            document.querySelector('#eggy').src = "images/shadowhead.png";
            document.querySelector('#davi').src = "images/shadowdavi.png";
        }
    }

    // Call function when window first opened
    loca();

    
    document.addEventListener('click', function(e){
        //  Change boolean to true when test button clicked
        if (e.target.matches('#arrival button')) {
            localStorage.setItem('bool', 'true');
            loca();
        }

        // Clear local storage data completely
        if (e.target.matches('#reset')) {
            // console.log('clear clicked');
            localStorage.clear();
            loca();
        }

    }, false)




    


    





  








}())



Parse.initialize("73PmwhWYpnQSgxbIIrZU26yl7lmdQGMPc4q8sC1q","WTaWw3gbdA39gMVJjw3BVJjhud8oML2vLFbpOIUe");
// Parse server
Parse.serverURL = 'https://parseapi.back4app.com/';

// let newPhoto;
document.querySelector('#upload').addEventListener('submit', function(event){
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

  
  document.querySelector('#uploaded-img').innerHTML = html;
}


async function getPhotos(){

  console.log("buttonclicked")
 
  try{
      const records = Parse.Object.extend('photos');
      const query = new Parse.Query(records);
      query.descending('createdAt');
      const results = await query.find();
      // results.forEach(function(photo){
      //     console.log(photo);
      //     const photoURL = results[photo].get('file').url();
      //     showPhotosOnGallery(photoURL);
      // });
      for(i=0; i<results.length; i++){
        //   document.querySelector('.grid-container').innerHTML += '<div class="grid-item"><img class="slideImage" src="" alt="uploaded photo from gallery"></div>';

        document.querySelector('#imgScroll').innerHTML += '<img class="slideImage" src="" alt="uploaded photo from gallery"></div>';
          let slideImages = document.querySelectorAll('.slideImage');
          const photoURL = results[i].get('file').url();
          slideImages[i].src = `${photoURL}`;
          console.log(results[i].id);
          // slideImages[i].className = 'show';
      };
      // This is a good place to run a function that clears out the form, which you will write below.
      // clearForm();
  } catch (error) {
      console.error('Error while getting photo', error);
  } 
};
let fetachedImage = false;

document.querySelector('#next5').addEventListener('click', function(){
  
  if(!fetachedImage){
    
      getPhotos();
      // showUserWord();
  }

  document.querySelector('#openImg').className = 'hidden';

  document.querySelector('#container').className = 'showing';

  


});

document.querySelector('#previewBtn').addEventListener('click', function(){
  
    

    document.querySelector('#previewImgScreen').className = 'showing';

    document.querySelector('#next5').className = 'showing';

    // document.querySelector('#previewBtn').className = 'hidden';
  

  
  });

  document.querySelector('#close1').addEventListener('click', function(){

    document.querySelector('#openImg').className = 'hidden';

  
  });

  document.querySelector('#close2').addEventListener('click', function(){
  
    document.querySelector('#previewImgScreen').className = 'hidden';
  
  });

  document.querySelector('#begin').addEventListener('click', function(){
  
    document.querySelector('#landing').className = 'hidden';
  
  });







