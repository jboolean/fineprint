import YouTubePlayer from 'youtube-player';
import 'core-js/es6/promise';
import './index.css';
import './videoHideShow.css';
import 'classlist-polyfill';

const youtubeIds = {
  forgiveness: 'h4dTETWXmGs',
  hardship: 'CmH1BH-iCcw',
  default: 'JkxBccGqyXQ'
};
const ids = Object.keys(youtubeIds);

const renderVideoPlayer = (id, youtubeId) => {
  const titleNode = document.querySelector('#aboveFold h1');

  const videoContainer = document.createElement('DIV');
  videoContainer.className = `videoContainer centerContainer ${id}Container`;

  const placeholder = document.createElement('DIV');
  videoContainer.appendChild(placeholder);

  titleNode.parentNode.insertBefore(videoContainer, titleNode);

  const player = new YouTubePlayer(placeholder, {
    videoId: youtubeId,
    width: '100%',
    height: '100%',
    playerVars: {
      modestbranding: 1,
      rel: 0
    }
  });
  return player;
};

let players;
const createPlayers = () => {
  players = {};
  ids.forEach((id) => {
    players[id] = renderVideoPlayer(id, youtubeIds[id]);
  });
};

let activePlayer;
const showVideo = (id) => {
  const aboveFold = document.getElementById('aboveFold');
  aboveFold.classList.remove('videoHidden');
  const shownClasses = ids.map((vidId) => vidId + 'Shown');
  aboveFold.classList.remove('videoHidden', ...shownClasses);
  aboveFold.classList.add('videoVisible', id + 'Shown');
  if (activePlayer) {
    activePlayer.stopVideo();
  }
  players[id].playVideo();
  activePlayer = players[id];
};

const addClassWhenAnimationEnded = (node, animationName) => {
  node.addEventListener('animationend', (e) => {
    if (e.animationName === animationName) {
      e.target.classList.add(animationName + 'Ended');
    }
  });
};

const hideVideo = () => {
  if (activePlayer) {
    activePlayer.stopVideo();
  }

  const aboveFold = document.getElementById('aboveFold');
  const shownClasses = ids.map((vidId) => vidId + 'Shown');
  aboveFold.classList.remove('videoVisible', ...shownClasses);
  aboveFold.classList.add('videoHidden');
};

const bind = () => {
  ids.forEach((id) => {
    document.getElementById(id + 'Link')
      .addEventListener('click', () => showVideo(id));
  });
  document.getElementById('back')
    .addEventListener('click', hideVideo);

  addClassWhenAnimationEnded(document.getElementById('selector'), 'fadein');

};

document.addEventListener('DOMContentLoaded', () => {
  createPlayers();
  bind();
});
