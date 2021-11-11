// import {bigPicture} from './big-picture.js';
import {closeModal} from './close-modal.js';

const VALUE_STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const EFFECT_LEVEL_VALUE_MAX = 100;

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
const imgUploadEffectsGroup = uploadForm.querySelector('.img-upload__effects');

let effectValue = effectLevelValue.value;
let currentValue = 100;

// Применяемые фильтры
const effects = {
  none: () => {
    effectLevel.classList.add('hidden');
    return 'none';
  },
  chrome: () => {
    effectLevel.classList.remove('hidden');
    return `grayscale(${effectValue * 0.01})`;
  },
  sepia: () => {
    effectLevel.classList.remove('hidden');
    return `sepia(${effectValue * 0.01})`;
  },
  marvin: () => {
    effectLevel.classList.remove('hidden');
    return `invert(${Math.floor(effectValue)}%)`;
  },
  phobos: () => {
    effectLevel.classList.remove('hidden');
    return `blur(${(effectValue * 3) * 0.01}px)`;
  },
  heat: () => {
    effectLevel.classList.remove('hidden');
    return `brightness(${effectValue * 3 * 0.01})`;
  },
};

// Определение слайдера
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
    from: (value) => parseFloat(value),
  },
});

// Обработчик нажания на Esc
const onEscKeydown = (evt) => {
  if ((evt.key === 'Escape' ||
    evt.key === 'Esc') &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')) {
    closeModal();
  }
};

// Обработчик клика выбора эффекта
const onImgUploadEffectsGroupClick = (evt) => {
  const target = evt.target;

  if (target.classList.contains('effects__preview')) {
    effectLevelSlider.noUiSlider.set(EFFECT_LEVEL_VALUE_MAX);
    const currentClass = target.classList[1];

    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectValue = values[handle];
      imgPreview.style.filter = effects[currentClass.replace('effects__preview--', '')](effectValue);
      effectLevelValue.value = effectValue;
    });
  }
};

// Функция открытия окна редактирования картинки
const openModal = () => {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  currentValue = 100;
  imgPreview.style.filter = 'none';
  imgUploadEffectsGroup.addEventListener('click', onImgUploadEffectsGroupClick);
};

document.addEventListener('keydown', onEscKeydown);


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

uploadFile.addEventListener('change', () => openModal());

uploadCancel.addEventListener('click', () => closeModal());

export {textHashtags, textDescription, body, uploadFile, uploadOverlay, openModal,
  uploadCancel, effectList, imgPreview, effectLevelSlider, imgUploadEffectsGroup,
  onImgUploadEffectsGroupClick, onEscKeydown, effectLevelValue, EFFECT_LEVEL_VALUE_MAX, closeModal};
