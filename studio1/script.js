(function() {
            'use strict';

            const myVideo = document.querySelector('#myVideo');
            const fs = document.querySelector('.fa-expand');

            //lines of the quote 
            const line1 = document.querySelector('#line1');
            const line2 = document.querySelector('#line2');
            const line3 = document.querySelector('#line3');
            const line4 = document.querySelector('#line4');
            const line5 = document.querySelector('#line5');
            const line6 = document.querySelector('#line6');

            const poem = {
                start: [0,7,13, 18, 23, 26],
                stop: [6.5,12.5,17.5,22.5, 25.5, 28.5],
                line: [line1, line2, line3, line4, line5, line6]
            }

            const intervalID = setInterval(checkTime, 1000);

            function checkTime(){
                console.log(parseInt(myVideo.currentTime));

                //loop to show and unhide each line one by one
                for (let i = 0; i < poem.start.length; i++) {
                    if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                    poem.line[i].className = "showing";
                    } else {
                    poem.line[i].className = "hidden";
                    }
                }

                

            }

            //on click, the video is full screen
            fs.addEventListener('click', function() {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();

                }
            });
            
            
            //when moving the cursor from left to right, the hue of the video changes. the two ranges of color, green and blue, are the main colors used in the film, Chungking Express 
            myVideo.addEventListener('mousemove', function(event) {
                const x = event.pageX;
                const hueValue = (90+x/30);
                myVideo.style.filter = `sepia(100%) saturate(300%) brightness(70%) hue-rotate(${hueValue}deg)`;
               
            });

            // const loading = document.querySelector('.fa-sharp fa-solid fa-rotate-right fa-spin');

            const loading = document.querySelector('#loading');

            myVideo.addEventListener('playing', function() {
                loading.style.display = 'none';
            });



        })();

