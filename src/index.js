import './index.css';
import './videoHideShow.css';

const ids = ['forgiveness', 'hardship', 'default'];

const showVideo = (id) => {
  var aboveFold = document.getElementById('aboveFold');
  aboveFold.classList.remove('videoHidden');
  const shownClasses = ids.map((id) => id + 'Shown');
  aboveFold.classList.remove('videoHidden', ...shownClasses);
  aboveFold.classList.add('videoVisible', id + 'Shown')
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