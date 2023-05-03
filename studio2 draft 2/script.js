(function() {
    'use strict';

    

    // const scrollContainer = document.querySelector("main");

    // scrollContainer.addEventListener("wheel", function(event) {
    //     event.preventDefault();
    //     scrollContainer.scrollLeft += event.deltaY;
    // });



    document.querySelector(".titleimg").addEventListener("mouseover", function(event){
        
        event.preventDefault();
        info.className = "showing";
        
        
    });

    document.querySelector(".titleimg").addEventListener("mouseout", function(event){
        
        event.preventDefault();
        info.className = "hidden";
        // info.className = "showing";
        
        
        
    });







    async function getData(){
        const myMoods = await fetch('data/movies.json');
        const data = await myMoods.json();
        console.log(data);
        document.querySelector('#info2').innerHTML = outputHTML1(data);
    }

    function outputHTML1(data){
        let title = '';
        
        title += `<p id="watchd" >Watch Date: ${data['one'].date}</p>`;
        title += `<p>Rating: ${data['one'].rating}/5</p>`;
        const imdbNumber = data['one'].imdb_number;
        getTitleInfo(imdbNumber);
        return title;
    }


    getData();

    

    async function getTitleInfo(title){
        // const url = `http://www.omdbapi.com/?i=${title}&plot=full&apikey=b6a9b242`;
        
        const url = `https://www.omdbapi.com/?i=${title}&plot=full&apikey=c4872804`;
       
        const titleData = await fetch(url);
        const data = await titleData.json();
        console.log(data);
        document.querySelector('#info1').innerHTML = outputHTML(data);
    }


    
    
    function outputHTML(data){
        
        let html = '';
        html += `<h2>${data.Title}</h2>`;
        html += `<p id="released">Released: ${data.Released}`;
        html += `<p>${data.Plot}</p>`;
        return html;
        
    }


   

    
    

    
   




})()