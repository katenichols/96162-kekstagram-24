import {body, closeModal} from './upload-form.js';

const LIMIT_OF_SHOW_COMMENTS = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgElement.querySelector('img');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const likesCount = bigPictureSocial.querySelector('.likes-count');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialCommentsItem = bigPictureSocial.querySelector('.social__comment');
const socialCommentsCount = bigPictureSocial.querySelector('.social__comment-count');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
let showArray = [];
let shownComments = 0;

bigPictureCancel.addEventListener('click', () => closeModal());

// Функция копирования узла. Источник - https://stackoverflow.com/
const copyElement = (commentsArray) => {
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  for (let i = 0; i <= commentsArray.length - 1; i++) {
    const itemCopy = socialCommentsItem.cloneNode(true);
    itemCopy.querySelector('img').src = commentsArray[i].avatar;
    itemCopy.querySelector('img').alt = commentsArray[i].name;
    itemCopy.querySelector('.social__text').textContent = commentsArray[i].message;
    socialComments.appendChild(itemCopy);
  }
};

// Функция отображения количества комментариев
const commentsCountLabel = (shownCommentsNumbers, totalLength) => {
  const strTotalLength = totalLength.toString();
  const lastLetter = strTotalLength[strTotalLength.length-1];
  const penultimateLetter = strTotalLength[strTotalLength.length-2];
  let wordEnding = '';

  if (strTotalLength.length === 1 && lastLetter === '1') {
    wordEnding = 'комментария';
  } else if ((penultimateLetter !== '1') && lastLetter === '1') {
    wordEnding = 'комментария';
  } else {
    wordEnding = 'комментариев';
  }

  if (totalLength <= LIMIT_OF_SHOW_COMMENTS) {
    socialCommentsCount.textContent = `${totalLength} из ${totalLength} ${wordEnding}`;
  } else {
    socialCommentsCount.textContent = `${shownCommentsNumbers} из ${totalLength} ${wordEnding}`;
  }
};

// Функия показа скрытых элементов
const showHiddenElements = (index, count) => {
  for (let y = index; y < count; y++) {
    showArray[y].classList.remove('hidden');
  }
};

// Функция показа следующей части комментов
const showNextComments = (evt) => {
  evt.preventDefault();
  if ((showArray.length - shownComments) <= LIMIT_OF_SHOW_COMMENTS) {
    showHiddenElements(showArray.length - shownComments, showArray.length);
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', showNextComments);
    shownComments = showArray.length;
  } else {
    commentsLoader.classList.remove('hidden');
    shownComments += LIMIT_OF_SHOW_COMMENTS;
    showHiddenElements(shownComments - LIMIT_OF_SHOW_COMMENTS, shownComments);
  }
  commentsCountLabel(shownComments, showArray.length);
};

// Функция показа комментариев по 5
const showComments = () => {
  showArray = Array.from(socialComments.querySelectorAll('.social__comment'));
  commentsLoader.classList.remove('hidden');
  shownComments = 0;

  // Прячем лоадер, если комментов меньше лимита
  if (showArray.length <= LIMIT_OF_SHOW_COMMENTS) {
    commentsLoader.classList.add('hidden');
    commentsCountLabel(showArray.length, showArray.length);
  } else {
    commentsLoader.classList.remove('hidden');
    for (let i = LIMIT_OF_SHOW_COMMENTS; i < showArray.length; i++) {
      showArray[i].classList.add('hidden');
    }
    shownComments += LIMIT_OF_SHOW_COMMENTS;
    commentsCountLabel(shownComments, showArray.length);
    commentsLoader.addEventListener('click', showNextComments);
  }
};

const drowBigPicture = (src, likes, comments, description, commentsArray) => {
  bigPicture.classList.remove('hidden');
  body.classList.remove('modal-open');
  bigPictureImg.src = src;
  likesCount.textContent = likes.textContent;
  socialCaption.textContent = description;

  copyElement(commentsArray);
  showComments();
};

export {bigPicture, drowBigPicture};
