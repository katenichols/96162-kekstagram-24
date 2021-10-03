// Список фраз для комментариев
const COMMENT_PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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

// Функция получения случайного числа из диапазона
const getRandomIntNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return -1;
  } else if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //источник - MDN
};

// Функция получения элемента массива
const getRandomArrayElement = (elements) => elements[getRandomIntNumber(0, elements.length - 1)];

// Функция составления объекта комментария
let randomComments = 0;
let idCommentsNumber = 0;

const createCommentsItem = () => {
  let messageText = '';

  if (getRandomIntNumber(1, 2) === 2) {
    messageText = `${getRandomArrayElement(COMMENT_PHRASES)} ${  getRandomArrayElement(COMMENT_PHRASES)}`;
  } else {
    messageText = getRandomArrayElement(COMMENT_PHRASES);
  }

  idCommentsNumber++;

  return {
    id: idCommentsNumber,
    avatar: `img/avatar${String(getRandomIntNumber(1, 6))}.svg`,
    message: messageText,
    name: getRandomArrayElement(AUTHORS_COMMENTS),
  };
};

// Функция создания общего массива
let idDescNumber = 0;

const createDescPictureItem = () => {
  idDescNumber++;
  randomComments = getRandomIntNumber(1, 4);
  idCommentsNumber = 0;
  return {
    id: idDescNumber,
    url: `photos/${String(idDescNumber)}.jpg`,
    description: `Happy life! Часть ${String(idDescNumber)}`,
    likes: getRandomIntNumber(15, 200),
    comments: Array.from({length: randomComments}, createCommentsItem),
  };
};

const descPicture = Array.from({length: 25}, createDescPictureItem);

console.log(descPicture);
