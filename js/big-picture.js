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
const socialComments = bigPictureSocial.querySelectorAll('.social__comment');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
// const picturesArray = pictures.querySelectorAll('.picture');

bigPictureCancel.addEventListener('click', () => closeModal());

// функция копирования узла. Источник - https://stackoverflow.com/
const copyElement = (node, count, deep) => {
  for (let i = 1; i <= count; i++) {
    const itemCopy = node.cloneNode(deep);
    console.log(itemCopy);
    console.log(node.parentNode);
    node.parentNode.insertBefore(itemCopy, node);
  }
};

// Функция проверки длины массива комментариев
const howMuchComments = (commentsArray, commentsNumber) => {
  if (!socialComments.length === commentsNumber) {
    const socialCommentsItemCount = Math.trunc(commentsArray.length - socialComments.length);
    commentsArray = [];
    console.log(socialCommentsItemCount);
    console.log(socialComments[0].parentNode);
    copyElement(commentsArray, socialComments[0], socialCommentsItemCount, true);
    // console.log(socialComments[0].parentNode);
  }
};

const drowBigPicture = (src, likes, comments, description, commentsArray) => {
  bigPicture.classList.remove('hidden');
  body.classList.remove('modal-open');
  bigPictureImg.src = src;
  likesCount.textContent = likes.textContent;
  commentsCount.textContent = comments.textContent;
  socialCaption.textContent = description;

  console.log(commentsArray);

  // howMuchComments(pictureItemComments, pictureItemComments.length);

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

export {bigPicture, drowBigPicture, howMuchComments};
