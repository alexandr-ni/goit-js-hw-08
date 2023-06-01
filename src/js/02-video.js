import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

function onPlay() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(CURRENT_TIME_KEY, seconds);
  });
}

player.on('timeupdate', throttle(onPlay, 1000));

if (localStorage.getItem(CURRENT_TIME_KEY) !== null) {
  player.setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY));
}
