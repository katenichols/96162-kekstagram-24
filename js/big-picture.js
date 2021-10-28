// import {pictures} from './fill-fragment.js';
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
const socialCaption = bigPictureSocial.querySelector('.social__caption');
// const picturesArray = pictures.querySelectorAll('.picture');

bigPictureCancel.addEventListener('click', () => closeModal());

// функция копирования узла. Источник - https://stackoverflow.com/
const copyElement = (commentsArray) => {
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  for (let i = 0; i <= commentsArray.length - 1; i++) {
    const itemCopy = socialCommentsItem.cloneNode(true);
    itemCopy.querySelector('img').src = `../${commentsArray[i].avatar}`;
    console.log(itemCopy.querySelector('img').src);
    // itemCopy.querySelector('img').src = commentsArray[i].avatar;
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

  // for (let y = 0; y < socialComments.length - 1; y++) {

  // }
};

// pictures.addEventListener('click', (evt) => {
//   document.addEventListener('keydown', onEscKeydown);
//   const target = evt.target;
//   const parent = target.parentNode;
//   if (target.classList.contains('picture__img')) {
//     drowBigPicture(target.src, parent.querySelector('.picture__likes'), parent.querySelector('.picture__comments'));
//   }
// });

export {bigPicture, drowBigPicture};
