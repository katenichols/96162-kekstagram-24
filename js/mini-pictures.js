// import {descPicture} from './create-main-array.js';
import {createDescPictureItem} from './create-main-array';

const PICTURES_COUNT = 25;

const pictures = document.querySelector('.pictures'); // найдена секция, куда будет вставляться массив картинок
const pictureTemplate = document.querySelector('#picture') // найден шаблон одной картинки
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment(); // определена переменная для фрагмента

// descPicture.forEach(({url, likes, comments}) => {
//   const pictureItem = pictureTemplate.cloneNode(true);

//   pictureItem.querySelector('.picture__img').src = url;
//   pictureItem.querySelector('.picture__likes').textContent = likes;
//   pictureItem.querySelector('.picture__comments').textContent = comments.length;

//   picturesFragment.appendChild(pictureItem);
// });

const createMiniPicture = () => {
  const pictureItem = pictureTemplate.cloneNode(true); // создали копию шаблона - блок картинки
  // createDescPictureItem();
  pictureItem.querySelector('.picture__img').src = createDescPictureItem().url;
  pictureItem.querySelector('.picture__likes').textContent = createDescPictureItem().likes;
  pictureItem.querySelector('.picture__comments').textContent = createDescPictureItem().comments.length;
};

picturesFragment.array(PICTURES_COUNT).forEach(() => createMiniPicture());


pictures.appendChild(picturesFragment);
