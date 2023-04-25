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


    const openBtns = document.querySelectorAll('.open');
    const closeBtns = document.querySelectorAll('.close');

    for (const eachBtn of openBtns) {
        eachBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const thisBtn = event.target.id;
            document.getElementById(`ol-${thisBtn}`).className = 'overlay showing';
        });
    }

    for (const eachBtn of closeBtns) {
        eachBtn.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.showing').className = 'overlay hidden';
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('.showing').className = 'overlay hidden';
        }
    });
   




})()