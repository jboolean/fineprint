import './index.css';

const ids = ['forgiveness', 'hardship', 'default'];

const videoUrlOptions = '?color=ffffff&title=0&byline=0&portrait=0'
const urls = {
  forgiveness: 'https://player.vimeo.com/video/247727588' + videoUrlOptions
}

let activePlayer;

const showVideo = (id) => {
  var aboveFold = document.getElementById('aboveFold');
  aboveFold.classList.remove('videoHidden');
  const shownClasses = ids.map((id) => id + 'Shown');
  aboveFold.classList.remove('videoHidden', ...shownClasses);
  aboveFold.classList.add('videoVisible', id + 'Shown')
  const url = urls[id];
  // document.getElementById('vimeoFrame').setAttribute('src', url);

  // const videoContainer = document.getElementById('videoContainer');
  if (activePlayer) {
    activePlayer.pause();
  }

  activePlayer = new Vimeo.Player('vimeoRenderBox', {
    url,
    byline: false,
    color: 'fff',
    title: false,
    portrait: false,
    responsive: true
  });

  vimeoPlayer.play();
}

const addClassWhenAnimationEnded = (node, animationName) => {
  node.addEventListener('animationend', (e) => {
    if (e.animationName === animationName) {
      e.target.classList.add(animationName + 'Ended');
    }
  })
}

const bind = () => {
  ids.forEach((id) => {
    document.getElementById(id + 'Link')
      .addEventListener('click', () => showVideo(id));
  });

  addClassWhenAnimationEnded(document.getElementById('selector'), 'fadein');

};

document.addEventListener('DOMContentLoaded', () => {
  bind();
});