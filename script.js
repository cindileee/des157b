(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const image = document.querySelector('img');
    const btnImage = document.querySelector('button img');
    const moveImage = document.querySelector('.shooting-star');
    const sections = document.querySelectorAll('section')
    
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            image.src = 'images/test9.png';
            btnImage.src = 'images/moon.png';
            moveImage.src= 'images/bird.png';
            for (const section of sections) {
                section.className = 'switch';
            }
            
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            image.src = 'images/test7.png';
            btnImage.src = 'images/sun.png';
            moveImage.src= 'images/star2.png';
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
        }
    })





    
})()