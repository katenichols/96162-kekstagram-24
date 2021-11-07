import {listenKeydown} from './listener-keydown.js';
import {closeModal} from './close-modal.js';

const VALUE_STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
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
const scale = document.querySelector('.scale');
const controlSmaller = scale.querySelector('.scale__control--smaller');
const controlBigger = scale.querySelector('.scale__control--bigger');
const controlValue = scale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let currentValue = 100;

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

// Обработка кликов по списку эффектов
const applyFilter = (evt) => {
  evt.preventDefault();
  listenKeydown();
  let target = evt.target;
  if (!target.classList.contains('effects__preview')) {
    target = evt.target.firstElementChild;
  }
  if (target.classList.contains('effects__preview')) {
    effects[target.classList[1].replace('effects__preview--', '')]();
  }
};

const openModal = () => {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  currentValue = 100;
  imgUploadPreview.style.transform = 'scale(1)';
  effectList.addEventListener('click', applyFilter);
};

uploadFile.addEventListener('change', () => openModal());

uploadCancel.addEventListener('click', () => closeModal());

// listenKeydown();

// Обработка кликов по кнопкам масштаба
controlSmaller.addEventListener('click', () => {
  currentValue -= VALUE_STEP;
  if (currentValue > MIN_VALUE) {
    imgUploadPreview.style.transform = `scale(0.${currentValue})`;
  } else {
    currentValue = MIN_VALUE;
    imgUploadPreview.style.transform = `scale(0.${MIN_VALUE})`;
  }
  controlValue.value = `${currentValue}%`;
});

controlBigger.addEventListener('click', () => {
  currentValue += VALUE_STEP;
  if (currentValue < MAX_VALUE) {
    imgUploadPreview.style.transform = `scale(0.${currentValue})`;
  } else {
    currentValue = MAX_VALUE;
    imgUploadPreview.style.transform = 'scale(1)';
  }
  controlValue.value = `${currentValue}%`;
});

export {textHashtags, textDescription, body, uploadFile, uploadOverlay, openModal,
  uploadCancel, applyFilter, effectList, imgPreview};
