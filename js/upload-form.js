const body = document.querySelector('body');
const uploadForm = body.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const uploadEffects = uploadForm.querySelector('.img-upload__effects');
const effectNone = uploadForm.querySelector('#effect-none');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');

const openModal = () => {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
};

uploadFile.addEventListener('change', () => openModal());

const closeModal = () => {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadFile.value = '';
};

uploadCancel.addEventListener('click', () => closeModal());

uploadForm.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (textHashtags === document.activeElement) {
      textHashtags.value = '';
      textHashtags.blur();
      textDescription.focus();
    } else if (textDescription === document.activeElement) {
      textDescription.value = '';
      textDescription.blur();
    }
    else {
      closeModal();
    }
  }
});

uploadEffects.addEventListener('click', (evt) => {
  console.log(evt.target);
  if (evt.target.classList.contains('effect__preview')) {
    evt.target.checked = 'true';
  }
});

if (effectNone.checked) {
  effectLevel.classList.add('hidden');
} else {
  effectLevel.classList.remove('hidden');
}

export {textHashtags, textDescription};
