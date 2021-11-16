import {drawMiniPicture} from './mini-pictures.js';

const pictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const addToFragment = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    picturesFragment.appendChild(drawMiniPicture(photos[i]));
  }

  return picturesFragment;
};

const renderPictures = (photos) => pictures.appendChild(addToFragment(photos));

export {pictures, renderPictures};
