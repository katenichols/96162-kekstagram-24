import {onEscKeydown} from './esc-keydown.js';
import {pictures} from './fill-fragment.js';
import {body} from './upload-form.js';
import {closeModal} from './close-modal.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', () => closeModal());

const drowBigPicture = (bigView) => {
  bigPicture.classList.remove('hidden');
  body.classList.remove('modal-open');
  bigPictureImg.url = bigView.src;
};

pictures.addEventListener('click', (evt) => {
  document.addEventListener('keydown', onEscKeydown);
  const target = evt.target;
  if (target.classList.contains('picture__img')) {
    console.log(evt.target);
    drowBigPicture();
  }
});

export {bigPicture};
