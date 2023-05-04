(function(){
    'use strict';

    //to scroll horizontally
    const scrollContainer = document.querySelector("main");

    scrollContainer.addEventListener("wheel", function(event) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
    });



    //get my own json data
    async function getData(){
        const watched = await fetch('data/movies.json');
        const data = await watched.json();
        const values = Object.values(data);
        console.log(values);
        document.querySelector('#container').innerHTML = outputHTML(values);

    }
    
    //for each movie, it will show the name, watch date, and my rating
    function outputHTML(data){
        let html = '';
        data.forEach( function(eachEntry, index){
           
            html += '<section id="movie">';
            html += `<img src ="images/${eachEntry.img}" class="titleimg" >`;
            html += '<div class="info">';
            html += `<h2>${eachEntry.title}</h2>`;

            html += '<div id="outside">';
            html += '</div>';

            html += `<p id="me1">Watch Date: ${eachEntry.date}</p>`;
            html += `<p id="me2">Cindy's Rating: ${eachEntry.rating}/5</p>`;
            

            html += '</div>';
            html += '</section>';



            const imdbNumber = eachEntry.imdb_number;
            getTitleInfo(imdbNumber,index);
            
            

            
        } );
        
        
        return html;
        
        
    } 


    //fetch outside data from IMDB
    async function getTitleInfo(title,index){
        const url = `http://www.omdbapi.com/?i=${title}&plot=full&apikey=b6a9b242`;
        const titleData = await fetch(url);
        const data = await titleData.json();
        
        // Update querySelector to select the correct element based on the index
        document.querySelectorAll('#outside')[index].innerHTML = outputHTML1(data);

        
    }
    
    //displays release date, director name, and summary of the plot
    function outputHTML1(data){

        
        let html1 = '';
        html1 += `<p id="outsidedetails">Released: ${data.Released} </p>`;
        html1 += `<p id="outsidedetails">Director: ${data.Director} </p>`;
        html1 += `<p id="plot">${data.Plot}</p>`;
        
        console.log(data.Title);
        console.log(data.Released);
        return html1;


        
        
        
    }
    
  
    
    getData();


    
    

})(); // end IIFE