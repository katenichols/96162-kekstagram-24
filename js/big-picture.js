import {body} from './upload-form.js';
import {closeModal} from './close-modal.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgElement.querySelector('img');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const likesCount = bigPictureSocial.querySelector('.likes-count');
const commentsCount = bigPictureSocial.querySelector('.comments-count');
const socialComments = bigPictureSocial.querySelector('.social__comments');
const socialCommentsItem = bigPictureSocial.querySelector('.social__comment');
const socialCommentsCount = bigPictureSocial.querySelector('.social__comment-count');
const commentsLoader = bigPictureSocial.querySelector('.comments-loader');
const socialCaption = bigPictureSocial.querySelector('.social__caption');

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

const drowBigPicture = (src, likes, comments, description, commentsArray) => {
  bigPicture.classList.remove('hidden');
  body.classList.remove('modal-open');
  bigPictureImg.src = src;
  likesCount.textContent = likes.textContent;
  commentsCount.textContent = comments.textContent;
  socialCaption.textContent = description;

  copyElement(commentsArray);


  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

export {bigPicture, drowBigPicture};
