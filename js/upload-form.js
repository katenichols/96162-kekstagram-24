import {closeModal} from './close-modal.js';
import {onEscKeydown} from "./esc-keydown.js";

const body = document.querySelector('body');
const uploadForm = body.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const effectList = uploadForm.querySelector('.effects__list');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const imgPreview = uploadForm.querySelector('.img-upload__preview > img');

const effects = {
  none: () => {
    imgPreview.style.filter = '';
    effectLevel.classList.add('hidden');
  },
  chrome: () => {
    imgPreview.style.filter = 'grayscale(1)';
    effectLevel.classList.remove('hidden');
  },
  sepia: () => {
    imgPreview.style.filter = 'sepia(1)';
    effectLevel.classList.remove('hidden');
  },
  marvin: () => {
    imgPreview.style.filter = 'invert(100%)';
    effectLevel.classList.remove('hidden');
  },
  phobos: () => {
    imgPreview.style.filter = 'blur(3px)';
    effectLevel.classList.remove('hidden');
  },
  heat: () => {
    imgPreview.style.filter = 'brightness(3)';
    effectLevel.classList.remove('hidden');
  },
};

const openModal = () => {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
};

uploadFile.addEventListener('change', () => openModal());

// document.addEventListener('keydown', onEscKeydown);

// const closeModal = () => {
//   body.classList.remove('modal-open');
//   uploadOverlay.classList.add('hidden');
//   uploadFile.value = '';
//   document.removeEventListener('keydown', onEscKeydown);
// };

uploadCancel.addEventListener('click', () => closeModal());

effectList.addEventListener('click', (evt) => {
  evt.preventDefault();
  document.addEventListener('keydown', onEscKeydown);
  let target = evt.target;
  if (!target.classList.contains('effects__preview')) {
    target = evt.target.firstElementChild;
  }
  if (target.classList.contains('effects__preview')) {
    effects[target.classList[1].replace('effects__preview--', '')]();
  }
});

export {textHashtags, textDescription, body, uploadFile, uploadOverlay};
