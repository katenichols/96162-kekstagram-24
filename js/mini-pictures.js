import {descPicture} from './create-main-array.js';
import {onEscKeydown} from './esc-keydown.js';
import {drowBigPicture} from './big-picture.js';

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

    const pictureItemDescription = descPicture[elemIndex].description;
    const pictureItemComments = descPicture[elemIndex].comments;

    pictureItem.addEventListener('click', (evt) => {
      document.addEventListener('keydown', onEscKeydown);
      const target = evt.target;

      if (target.classList.contains('picture__img')) {
        drowBigPicture(target.src, pictureItem.querySelector('.picture__likes'), pictureItem.querySelector('.picture__comments'),
          pictureItemDescription, pictureItemComments);
      }
    });
  }

  elemIndex++;

  return pictureItem;
}

export {drawMiniPicture};
