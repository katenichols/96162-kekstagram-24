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
const numberOfShowSecondIteration = 2;
let numberOfShow = 1;
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

// Функция показа комментариев по 5
const showComments = (commentsArray) => {
  const length = commentsArray.length;
  const hideArray = Array.from(socialComments.querySelectorAll('.social__comment'));
  showArray = [];

  // прячем лоадер, если комментов меньше лимита
  if (hideArray.length <= LIMIT_OF_SHOW_COMMENTS) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  // прячем все комментарии
  for (let i = 0; i < length; i++) {
    hideArray[i].classList.add('hidden');
  }

  // добавляем комментарии в массив для показа
  if (hideArray.length < LIMIT_OF_SHOW_COMMENTS) {
    for (let y = 0; y < hideArray.length; y++) {
      showArray.push(hideArray[y]);
      showArray[y].classList.remove('hidden');
    }
  } else {
    for (let y = 0; y < LIMIT_OF_SHOW_COMMENTS; y++) {
      showArray.push(hideArray[y]);
      showArray[y].classList.remove('hidden');
    }
  }

  // обрабатываем клик по лоадеру
  commentsLoader.addEventListener('click', () => {
    numberOfShow++;
    // удаляем из массива комментов уже показанные комменты
    hideArray.splice(0, LIMIT_OF_SHOW_COMMENTS);
    // изменяем число показанных комментов
    const length = commentsArray.length;
    shownComments = LIMIT_OF_SHOW_COMMENTS * numberOfShow;

    // выравниваем число показанных комментов по их общему количеству
    if (shownComments > length) {
      shownComments = length;
    }

    // в массиве к показу скрываем уже показанные комменты, а затем удаляем их
    for (let k = 0; k < LIMIT_OF_SHOW_COMMENTS; k++) {
      showArray[k].classList.add('hidden');
    }
    showArray.splice(0, LIMIT_OF_SHOW_COMMENTS);

    // добавляем в массив к показу новую порцию комментов
    if (hideArray.length <= LIMIT_OF_SHOW_COMMENTS) {
      commentsLoader.classList.add('hidden');
      numberOfShow = numberOfShowSecondIteration;

      for (let l = 0; l < hideArray.length; l++) {
        showArray.push(hideArray[l]);
        // if (showArray.length > 0 && showArray[l].classList.contains('hidden')) {
          showArray[l].classList.remove('hidden');
        // }
      }
    } else {
      for (let l = 0; l < LIMIT_OF_SHOW_COMMENTS; l++) {
        showArray.push(hideArray[l]);
        // if (showArray.length > 0 && showArray[l].classList.contains('hidden')) {
          showArray[l].classList.remove('hidden');
        // }
      }
    }

    // вызываем функцию показа информации о комментах
    commentsCountLabel(shownComments, length);
  });
};

const drowBigPicture = (src, likes, comments, description, commentsArray) => {
  bigPicture.classList.remove('hidden');
  body.classList.remove('modal-open');
  bigPictureImg.src = src;
  likesCount.textContent = likes.textContent;
  socialCaption.textContent = description;
  shownComments = LIMIT_OF_SHOW_COMMENTS;

  commentsCountLabel(shownComments, Number.parseInt(comments.textContent));
  copyElement(commentsArray);
  showComments(commentsArray);
};

export {bigPicture, drowBigPicture};
