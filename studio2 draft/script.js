(function() {
    'use strict';

    // async function getData(){
    //     const mymovies = await fetch('data/movies.json');
    //     const data = await mymovies.json();
    //     console.log(data);
    //     document.querySelector('#movies').innerHTML = outputHTML1(data);
    //     document.querySelector('#movies').innerHTML = outputHTML2(data);
    //     document.querySelector('#movies').innerHTML = outputHTML3(data);
    //     document.querySelector('#movies').innerHTML = outputHTML4(data);
    // }

    // function outputHTML1(data){
    //     let html = '<p>';
    //     html += `at 10:15 I was feeling ${data['10:15']}`;
    //     html += '<p>';
    //     return html;
    // }

    // function outputHTML2(data){
    //     const feeling = ['really bad', 'grumpy', 'meh', 'ok', 'good!', 'wicket awesome!'];
    //     let html = '<p>';
    //     html += `at 10:15 I was feeling ${feeling[data['10:15']]}`;
    //     html += '<p>';
    //     return html;
    // }

    // function outputHTML3(data){
    //     let html = '<p>';
    //     for(let key in data){
    //         html += '<p>';
    //         html += `At ${key} I was feeling ${data[key]}`;
    //         html += '<p>';
    //     }
    //     return html;
    // }

    // function outputHTML4(data){
    //     const feeling = ['really bad', 'grumpy', 'meh', 'ok', 'good!', 'wicket awesome!'];
    //     let html = '<p>';
    //     for(let key in data){
    //         html += '<p>';
    //         html += `At ${key} I was feeling ${feeling[data[key]]}`;
    //         html += '<p>';
    //     }
    //     return html;
    // }

    // getData();


    // const openBtns = document.querySelectorAll('.open');
    // const closeBtns = document.querySelectorAll('.close');

    // for (const eachBtn of openBtns) {
    //     eachBtn.addEventListener('click', function (event) {
    //         event.preventDefault();
    //         const thisBtn = event.target.id;
    //         document.getElementById(`ol-${thisBtn}`).className = 'overlay showing';
    //     });
    // }

    // for (const eachBtn of closeBtns) {
    //     eachBtn.addEventListener('click', function (event) {
    //         event.preventDefault();
    //         document.querySelector('.showing').className = 'overlay hidden';
    //     });
    // }

    // document.addEventListener('keydown', function (event) {
    //     if (event.key === 'Escape') {
    //         document.querySelector('.showing').className = 'overlay hidden';
    //     }
    // });
   







    const scrollContainer = document.querySelector("main");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});













        // async function getData(){
        //     const watched = await fetch('data/watched.json');
        //     const data = await watched.json();
        //     const values = Object.values(data);
        //     console.log(values);
        //     document.querySelector('.open').innerHTML = outputMovieList(values);
        //     // document.querySelector('#tv').innerHTML = outputTvList(values);

        //     const links = document.querySelectorAll('aside ol li a');
        //     links.forEach(function(eachLink){
        //         eachLink.addEventListener('click', function(event){
        //             event.preventDefault();
        //             const imdbNumber = event.target.getAttribute('href');
        //             getTitleInfo(imdbNumber);
        //         } );
        //     });  
        // }

        // function outputMovieList(data){
        //     let movies = '';
        //     data.forEach( function(eachEntry){
        //         if(eachEntry.type == 'movie'){
        //             movies += `<li><a href="${eachEntry.imdb_number}">`;
        //             movies += eachEntry.title;
        //             movies += '</a></li>';
        //         };
        //     } );
        //     return movies;
        // }

        // // function outputTvList(data){
        // //     let tv = '';
        // //     data.forEach( function(eachEntry){
        // //         if(eachEntry.type == 'television'){
        // //             tv += `<li><a href="${eachEntry.imdb_number}">`;
        // //             tv += `${eachEntry.title.show_title} ${eachEntry.title.episode} ${eachEntry.title.episode_title}`;
        // //             tv += '</a></li>';
        // //         }
        // //     } );
        // //     return tv;
        // // } 

        // getData();

        // async function getTitleInfo(title){
        //     const url = `http://www.omdbapi.com/?i=${title}&plot=full&apikey=b6a9b242`;
        //     const titleData = await fetch(url);
        //     const data = await titleData.json();
        //     console.log(data);
        //     document.querySelector("#popup").innerHTML = outputHTML(data);
        // }

        // function outputHTML(data){
        //     let html = '';
        //     if(data.Poster != 'N/A'){
        //         html += `<img src="${data.Poster}">`;
        //     }
        //     html += `<h2>${data.Title}</h2>`;
        //     html += `<p>Released: ${data.Released} Season: ${data.Season} Episode: ${data.Episode}</p>`;
        //     html += `<p>Actors: ${data.Actors}</p>`;
        //     html += `<p>${data.Plot}</p>`;
            
        //     return html;
        // }











        async function getData(){
            const myMoods = await fetch('data/movies.json');
            const data = await myMoods.json();
            console.log(data);
            document.querySelector('#moods').innerHTML = outputHTML1(data);
            document.querySelector('#moods').innerHTML = outputHTML2(data);
            document.querySelector('#moods').innerHTML = outputHTML3(data);
            document.querySelector('#moods').innerHTML = outputHTML4(data);
        }
    
        function outputHTML1(data){
            let html = '<p>';
            html += `at 10:15 I was feeling ${data['10:15']}`;
            html += '<p>';
            return html;
        }
    
        function outputHTML2(data){
            const feeling = ['really bad', 'grumpy', 'meh', 'ok', 'good!', 'wicket awesome!'];
            let html = '<p>';
            html += `at 10:15 I was feeling ${feeling[data['10:15']]}`;
            html += '<p>';
            return html;
        }
    
        function outputHTML3(data){
            let html = '<p>';
            for(let key in data){
                html += '<p>';
                html += `At ${key} I was feeling ${data[key]}`;
                html += '<p>';
            }
            return html;
        }
    
        function outputHTML4(data){
            const feeling = ['really bad', 'grumpy', 'meh', 'ok', 'good!', 'wicket awesome!'];
            let html = '<p>';
            for(let key in data){
                html += '<p>';
                html += `At ${key} I was feeling ${feeling[data[key]]}`;
                html += '<p>';
            }
            return html;
        }
    
        getData();




})()