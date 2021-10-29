import {getRandomArrayElement} from './util.js';
import {getRandomIntNumber} from './util.js';

// Список имен комментаторов
const AUTHORS_COMMENTS = [
  'Александр',
  'Альбина',
  'Антон',
  'Артём',
  'Владимир',
  'Георгий',
  'Гузель',
  'Дарья',
  'Евгения',
  'Елена',
  'Ирина',
  'Любовь',
  'Максим',
  'Михаил',
  'Ольга',
  'Роман',
  'Сергей',
  'Софья',
];

// Список фраз для комментариев
const COMMENT_PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Функция составления объекта комментария

const createCommentsItem = (count) => {
  let messageText = '';

  if (getRandomIntNumber(1, 2) === 2) {
    messageText = `${getRandomArrayElement(COMMENT_PHRASES)} ${getRandomArrayElement(COMMENT_PHRASES)}`;
  } else {
    messageText = getRandomArrayElement(COMMENT_PHRASES);
  }

  return {
    id: count,
    avatar: `img/avatar-${String(getRandomIntNumber(1, 6))}.svg`,
    message: messageText,
    name: getRandomArrayElement(AUTHORS_COMMENTS),
  };
};

const commentsArray = () => {
  const newArray = [];
  const randomComments = getRandomIntNumber(1, 4);

  for (let i = 1; i <= randomComments; i++) {
    newArray.push(createCommentsItem(i));
  }
  return newArray;
};

export {commentsArray};
