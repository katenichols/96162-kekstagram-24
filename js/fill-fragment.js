import {descPicture} from './create-main-array.js';
import {drawMiniPicture} from './mini-pictures.js';

const pictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

// Функция добавления копии шаблона во фрагмент
const addToFragment = () => {
  for (let i = 0; i < descPicture.length; i++) {
    picturesFragment.appendChild(drawMiniPicture());
  }

  return picturesFragment;
};

pictures.appendChild(addToFragment());
