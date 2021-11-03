import {body} from './upload-form.js';
import {closeModal} from './close-modal.js';

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
let commentsToShow = 0;
let count = LIMIT_OF_SHOW_COMMENTS;
let shownComments = 0;


bigPictureCancel.addEventListener('click', () => closeModal());

// функция копирования узла. Источник - https://stackoverflow.com/
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

// const showNextComments = (lastLength, showArray) => {
//   console.log('Оставшихся комментов - ', lastLength, showArray.length);
//   if (LIMIT_OF_SHOW_COMMENTS >= lastLength) {
//     for (let y = LIMIT_OF_SHOW_COMMENTS; y < lastLength; y++) {
//       shownComments = showArray.length;
//       showArray[y].classList.remove('hidden');
//       commentsLoader.classList.add('hidden');
//       commentsLoader.removeEventListener('click', showNextComments(commentsToShow, showArray));
//       return;
//     }
//   }

//   // вызываем функцию показа информации о комментах
//   commentsCountLabel(shownComments, length);
// };

// Функция показа комментариев по 5
const showComments = (commentsArray) => {
  commentsToShow = 0;
  showArray = Array.from(socialComments.querySelectorAll('.social__comment'));
  commentsLoader.classList.remove('hidden');
  console.log(showArray.length);

  // прячем лоадер, если комментов меньше лимита
  if (showArray.length <= LIMIT_OF_SHOW_COMMENTS) {
    commentsLoader.classList.add('hidden');
    commentsCountLabel(commentsArray.length, commentsArray.length);
    return;
  } else {
    commentsLoader.classList.remove('hidden');
    for (let i = LIMIT_OF_SHOW_COMMENTS; i < showArray.length; i++) {
      showArray[i].classList.add('hidden');
      commentsToShow++;
    }
    console.log(commentsToShow);
  }

  // обрабатываем клик по лоадеру
  // commentsLoader.addEventListener('click', showNextComments(commentsToShow, showArray));
  commentsLoader.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log('Оставшихся комментов - ', commentsToShow, showArray.length);
  if (LIMIT_OF_SHOW_COMMENTS >= commentsToShow) {
    shownComments = showArray.length;
    for (let y = LIMIT_OF_SHOW_COMMENTS; y < commentsToShow; y++) {
      showArray[y].classList.remove('hidden');
      // commentsLoader.classList.add('hidden');
      // commentsLoader.removeEventListener('click', showNextComments(commentsToShow, showArray));
      // return;
    }
  }

  // вызываем функцию показа информации о комментах
  commentsCountLabel(shownComments, showArray.length);
  });
};

const drowBigPicture = (src, likes, comments, description, commentsArray) => {
  bigPicture.classList.remove('hidden');
  body.classList.remove('modal-open');
  bigPictureImg.src = src;
  likesCount.textContent = likes.textContent;
  socialCaption.textContent = description;
  shownComments = LIMIT_OF_SHOW_COMMENTS;

  // commentsCountLabel(shownComments, Number.parseInt(comments.textConten, 10));
  commentsCountLabel(shownComments, commentsArray.length);
  copyElement(commentsArray);
  showComments(commentsArray);
};

export {bigPicture, drowBigPicture};
