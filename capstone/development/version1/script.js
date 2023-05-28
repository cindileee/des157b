(function(){
        'use strict';
        console.log('reading js');
    
        // City of Davis Origin Point for Map (38.545, -121.74 13.5)
        var map = L.map('map').setView([38.538, -121.75], 15);
    
        // Open street Map Tiling
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
        }).addTo(map);
    
        // Markers
        var marker = L.marker([38.5343, -121.7492]).addTo(map);
        marker.bindPopup('Mondavi Center');
    
        var marker = L.marker([38.531, -121.76]).addTo(map);
        marker.bindPopup('Arboretum');
        
        var marker = L.marker([38.5377, -121.7494]).addTo(map);
        marker.bindPopup("'Eye on Mrak' Egghead"); 
    
        // function geolocate(){
        //     if ("geolocation" in navigator) {
        //         navigator.geolocation.watchPosition((position) => {
        //             const latitude = position.coords.latitude;
        //             const longitude = position.coords.longitude;
        //             console.log(latitude, longitude)
        //             // return longitude, latitude;
        //           });
        //       } else {
        //         console.log('Sorry, your browser does not support Geolocation API')
        //       }
        //     }
             
        
        // Routing
        document.querySelector('#drive').addEventListener('click', routeDrive);
        document.querySelector('#walk').addEventListener('click', routeWalk);
    
        var routingRunning = false;
    
        // Driving Route
        function routeDrive(){
                
            // Driving directions using MAPBOX
            var drouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
            profile: 'mapbox/driving',
            urlParameters: {
                vehicle: 'car'
            }});
    
            // If user allows geolocation...
            if ("geolocation" in navigator) {
    
                // Get geolocation 
                navigator.geolocation.watchPosition((position) => {
                    let dlatitude = position.coords.latitude;
                    let dlongitude = position.coords.longitude;
    
                    // Driving route applied using LEAFBOX OUTING MACHINE
                    var routingDrive = L.Routing.control({
                        waypoints: [
                            L.latLng(38.5377, -121.7494),
                            L.latLng(dlatitude, dlongitude)
                        ],
                        router: drouter,
                        profile: 'mapbox/driving'
                    }).addTo(map);
    
                    // Getting rid of route (when done?)
                    document.querySelector('#endd').addEventListener('click', function(){
                        map.removeControl(routingDrive);
                    })
    
                  });
              } else {
                console.log('Sorry, your browser does not support Geolocation API')
              }
    
        }
    
        // Walking Route
        function routeWalk(){
                
            // Walking directions using MAPBOX
            var wrouter = L.Routing.mapbox('pk.eyJ1IjoiYWRpbWFhbm8iLCJhIjoiY2xocWtmd2p1MGpyZTNxbjAxMTIxcXgzbCJ9.GmkYdI24OMR3rjHR_aPZHA', {
                profile: 'mapbox/walking',
                urlParameters: {
                    vehicle: 'foot'
                }
            });
    
            // If user allows geolocation...
            if ("geolocation" in navigator) {
    
                // Get geolocation 
                navigator.geolocation.watchPosition((position) => {
                    let wlatitude = position.coords.latitude;
                    let wlongitude = position.coords.longitude;
    
                    // Walking route applied using LEAFBOX OUTING MACHINE
                    var routingWalk =  L.Routing.control({
                        waypoints: [
                            L.latLng(38.5377, -121.7494),
                            L.latLng(wlatitude, wlongitude)
                        ],
                        router: wrouter,
                        profile: 'mapbox/walking'
                    }).addTo(map);
    
                    // Getting rid of route (when done?)
                     document.querySelector('#endw').addEventListener('click', function(){
                        map.removeControl(routingWalk);
                    })
    
                  });
              } else {
                console.log('Sorry, your browser does not support Geolocation API')
              }
            
        }
    
  
  
  
  
  
  
  
    
    
        
    
  
  
  
  
  //App ID and JS Key from B4A
  Parse.initialize("73PmwhWYpnQSgxbIIrZU26yl7lmdQGMPc4q8sC1q","WTaWw3gbdA39gMVJjw3BVJjhud8oML2vLFbpOIUe");
  // Parse server
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
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
        
    
  
  
  
  
  
  
  //buttons
  
  document.querySelector("#photoBtn").addEventListener("click", function(event){
    event.preventDefault();
    upload.className = "show";
    
    
  });
        
    
    }())