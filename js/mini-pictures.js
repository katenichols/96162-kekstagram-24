import {drowBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const drawMiniPicture = (picture) => {
  const pictureItem = pictureTemplate.cloneNode(true);

  pictureItem.querySelector('.picture__img').src = picture.url;
  pictureItem.querySelector('.picture__likes').textContent = picture.likes;
  pictureItem.querySelector('.picture__comments').textContent = picture.comments.length;

  const pictureItemDescription = picture.description;
  const pictureItemComments = picture.comments;

  pictureItem.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('picture__img')) {
      drowBigPicture(target.src, pictureItem.querySelector('.picture__likes'), pictureItem.querySelector('.picture__comments'),
        pictureItemDescription, pictureItemComments);
    }
  });

  return pictureItem;
};

export {drawMiniPicture};
