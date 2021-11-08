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
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectLevelValueMax = 100;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => {return parseFloat(value)},
  },
});

let currentValue = 100;

// const effects = {
//   none: () => {
//     effectLevel.classList.add('hidden');
//     imgPreview.style.filter = '';
//   },
//   chrome: () => {
//     effectLevel.classList.remove('hidden');
//     imgPreview.style.filter = 'grayscale(1)';
//   },
//   sepia: () => {
//     effectLevel.classList.remove('hidden');
//     imgPreview.style.filter = 'sepia(1)';
//   },
//   marvin: () => {
//     effectLevel.classList.remove('hidden');
//     imgPreview.style.filter = 'invert(100%)';
//   },
//   phobos: () => {
//     effectLevel.classList.remove('hidden');
//     imgPreview.style.filter = 'blur(3px)';
//   },
//   heat: () => {
//     effectLevel.classList.remove('hidden');
//     imgPreview.style.filter = 'brightness(3)';
//   },
// };

const effects = {
  none: () => {
    effectLevel.classList.add('hidden');
    return 'none';
  },
  chrome: () => {
    effectLevel.classList.remove('hidden');
    return `grayscale(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  sepia: () => {
    effectLevel.classList.remove('hidden');
    return `sepia(${parseInt(effectLevelValue.value, 10) * 0.01})`;
  },
  marvin: () => {
    effectLevel.classList.remove('hidden');
    return `invert(${Math.floor(effectLevelValue.value)}%`;
  },
  phobos: () => {
    effectLevel.classList.remove('hidden');
    return `blur(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01})`;
  },
  heat: () => {
    effectLevel.classList.remove('hidden');
    return `brightness(${(parseInt(effectLevelValue.value, 10) * 3) * 0.01})`;
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
  imgPreview.style.transform = 'scale(1)';
  effectList.addEventListener('click', applyFilter);
  effectLevelValue.value = effectLevelValueMax;
  effectLevelSlider.noUiSlider.set(effectLevelValueMax);
};

uploadFile.addEventListener('change', () => openModal());

uploadCancel.addEventListener('click', () => closeModal());

// listenKeydown();

// Обработка кликов по кнопкам масштаба
controlSmaller.addEventListener('click', () => {
  currentValue -= VALUE_STEP;
  if (currentValue > MIN_VALUE) {
    imgPreview.style.transform = `scale(0.${currentValue})`;
  } else {
    currentValue = MIN_VALUE;
    imgPreview.style.transform = `scale(0.${MIN_VALUE})`;
  }
  controlValue.value = `${currentValue}%`;
});

controlBigger.addEventListener('click', () => {
  currentValue += VALUE_STEP;
  if (currentValue < MAX_VALUE) {
    imgPreview.style.transform = `scale(0.${currentValue})`;
  } else {
    currentValue = MAX_VALUE;
    imgPreview.style.transform = 'scale(1)';
  }
  controlValue.value = `${currentValue}%`;
});

effectLevelSlider.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
  console.log(effectLevelValue.value);
});

export {textHashtags, textDescription, body, uploadFile, uploadOverlay, openModal,
  uploadCancel, applyFilter, effectList, imgPreview, effectLevelSlider};
