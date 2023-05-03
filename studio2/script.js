(function(){
    'use strict';

    // const scrollContainer = document.querySelector("main");

    // scrollContainer.addEventListener("wheel", function(event) {
    //     event.preventDefault();
    //     scrollContainer.scrollLeft += event.deltaY;
    // });



    



    async function getData(){
        const watched = await fetch('data/movies.json');
        const data = await watched.json();
        const values = Object.values(data);
        console.log(values);
        // document.querySelector('#showdata').innerHTML = outputHTML(values);
        // document.querySelector('#container').innerHTML = outputHTML(values);
        // document.querySelector('#titleimg').innerHTML = outputHTML(values);
        document.querySelector('#container').innerHTML = outputHTML(values);


        // document.querySelector('#info').innerHTML = outputHTML2(values);

        // document.querySelector(".titleimg").addEventListener("mouseover", function(event){
        
        //     event.preventDefault();
        //     info.className = "showing";
            
            
        // });
    
        // document.querySelector(".titleimg").addEventListener("mouseout", function(event){
            
        //     event.preventDefault();
        //     info.className = "hidden";
        //     // info.className = "showing";
            
            
            
        // });
    }
    
    function outputHTML(data){
        let html = '';
        data.forEach( function(eachEntry){
           
            html += '<div id="movie">';
            html += `<img src ="images/${eachEntry.img}" class="titleimg">`;
            html += '<div id="info" >';
            html += `<h2>${eachEntry.title}</h2>`;
            html += `<p>Watch Date: ${eachEntry.date}</p>`;
            html += `<p>Rating: ${eachEntry.rating}/5</p>`;
            html += '<div id="outside">';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            
            const imdbNumber = eachEntry.imdb_number;
            // console.log(imdbNumber);
            getTitleInfo(imdbNumber);
            
            

            
        } );
        
        return html;

        
        
    } 

    
  
    
    getData();



    

    async function getTitleInfo(title){
        const url = `http://www.omdbapi.com/?i=${title}&plot=full&apikey=b6a9b242`;
        const titleData = await fetch(url);
        const data = await titleData.json();
        // console.log(data);
        document.querySelector("#outside").innerHTML = outputHTML1(data);
    }
    
    function outputHTML1(data){

        
        let html1 = '';
       
        html1 += `<h2>${data.Title}</h2>`;
        html1 += `<p>Released: ${data.Released} </p>`;
        html1 += `<p>Actors: ${data.Actors}</p>`;
        html1 += `<p>${data.Plot}</p>`;
        
        console.log(data.Title);
        console.log(data.Released);
        return html1;
        
        
    }
    

    
    


    
    

})(); // end IIFE