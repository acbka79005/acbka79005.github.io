//## Playlist
//
//*

'use strict';
/* globals WaveSurfer */

var AUDIO = function () {
    var $tracks = document.querySelectorAll('.js-audio'),
        classActive = 'is-active',
        iActive,
        Boxes = [],
        Tracks = [];

    $tracks.forEach(function ($track, index) {
        var $box = $track.parentNode,
            $btn = $box.querySelector('.js-audio-btn'),
            id = $track.getAttribute('data-id'),
            WS = WaveSurfer.create({
            container: $track,
            waveColor: '#0000fe',
            progressColor: '#0000b2',
            // barGap: 5,
            // barHeight: .5,
            // barWidth: 5,
            // cursorColor: '#eee',
            // cursorWidth: 2,
            height: 100,
            hideScrollbar: true,
            responsive: 17,
        });

        Boxes.push($box);
        Tracks.push(WS);

        WS.load(id);

        WS.on('ready', function () {
            $btn.addEventListener('click', function () {
                if (index === iActive) {
                    WS.pause();

                    $box.classList.remove(classActive);
                    // console.log('paused self');

                    iActive = null;
                } else {
                    if (typeof iActive === 'number') {
                        Tracks[iActive].pause();

                        Boxes[iActive].classList.remove(classActive);
                        // console.log('paused active', iActive);
                    }

                    $box.classList.add(classActive);
                    WS.play();

                    iActive = index;
                    // console.log('play', iActive);
                }
            });
        });
    });

    return $tracks;
};

AUDIO();
// console.log(AUDIO());
