//## Audio
//
//*

'use strict';

var AUDIO = function () {
    var Selector = {
            player: '.js-player',
            btn: '.js-player-btn'
        },
        Class = {
            isActive: 'is-active',
            isError: 'is-error'
        },
        $player = document.querySelectorAll(Selector.player)[0],
        $btn = document.querySelectorAll(Selector.btn)[0];

    if (!$btn) {
        return false;
    }

    $btn.addEventListener('click', function () {
        if ($player) {
            if ($player.paused) {
                $player.play();

                $btn.classList.add(Class.isActive);
            } else {
                $player.pause();

                $btn.classList.remove(Class.isActive);
            }
        } else {
            $btn.classList.add(Class.isError);
        }
    });

    return $player;
};

// console.log(AUDIO());
AUDIO();
