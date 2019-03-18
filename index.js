const ids = ['forgiveness', 'hardship', 'default'];

const videoUrlOptions = '?color=ffffff&title=0&byline=0&portrait=0'
const urls = {
  forgiveness: 'https://player.vimeo.com/video/247727588' + videoUrlOptions
}

const showVideo = (id) => {
  var aboveFold = document.getElementById('aboveFold');
  aboveFold.classList.remove('videoHidden');
  const shownClasses = ids.map((id) => id + 'Shown');
  aboveFold.classList.remove('videoHidden', ...shownClasses);
  aboveFold.classList.add('videoVisible', id + 'Shown')
  const url = urls[id];
  document.getElementById('vimeoFrame').setAttribute('src', url);
}

const bind = () => {
  ids.forEach((id) => {
    document.getElementById(id + 'Link')
      .addEventListener('click', () => showVideo(id));
  })
};

document.addEventListener('DOMContentLoaded', () => {
  bind();
});