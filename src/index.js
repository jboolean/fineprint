import YouTubePlayer from 'youtube-player';
import 'core-js/features/promise'; // used by youtube

import './index.css';
import './videoHideShow.css';

const youtubeIds = {
  forgiveness: 'IGZBsOPALDo',
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

const bind = () => {
  ids.forEach((id) => {
    document.getElementById(id + 'Link')
      .addEventListener('click', () => showVideo(id));
  });

  addClassWhenAnimationEnded(document.getElementById('selector'), 'fadein');

};

document.addEventListener('DOMContentLoaded', () => {
  createPlayers();
  bind();
});