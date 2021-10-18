import {descPicture} from './create-main-array.js';

const pictureTemplate = document.querySelector('#picture') // найден шаблон одной картинки
  .content
  .querySelector('.picture');

let elemIndex = 0;

// Функция отрисовки миниатюры фото
function drawMiniPicture(pictureItem) {
  if (elemIndex <= descPicture.length) {
    pictureItem = pictureTemplate.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = descPicture[elemIndex].url;
    pictureItem.querySelector('.picture__likes').textContent = descPicture[elemIndex].likes;
    pictureItem.querySelector('.picture__comments').textContent = descPicture[elemIndex].comments.length;
  }

  elemIndex++;

  return pictureItem;
}

export {drawMiniPicture};
