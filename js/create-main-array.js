import {getRandomIntNumber} from './util.js';
import {commentsArray} from './create-arrays.js';

// Функция создания общего массива
const PICTURES_COUNT = 25;
let randomComments = 0;
let idDescNumber = 1;

const createDescPictureItem = () => {
  randomComments = getRandomIntNumber(1, 4);
  return {
    id: idDescNumber++,
    url: `photos/${String(idDescNumber-1)}.jpg`,
    description: `Happy life! Часть ${String(idDescNumber-1)}`,
    likes: getRandomIntNumber(15, 200),
    comments: commentsArray(randomComments),
  };
};

const descPicture = new Array(PICTURES_COUNT).fill(null).map(() => createDescPictureItem());

export {descPicture};
