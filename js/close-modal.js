import {body, uploadOverlay, uploadFile, openModal, uploadCancel, imgUploadEffectsGroup, onImgUploadEffectsGroupClick,
  imgPreview, effectLevelSlider} from './upload-form.js';
import {onEscKeydown} from './esc-keydown.js';
import {bigPicture} from './big-picture.js';

const closeModal = () => {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  bigPicture.classList.add('hidden');
  imgPreview.style.filter = '';
  effectLevelSlider.noUiSlider.reset();

  imgUploadEffectsGroup.removeEventListener('click', onImgUploadEffectsGroupClick);
  uploadFile.removeEventListener('change', () => openModal());
  uploadCancel.removeEventListener('click', () => closeModal());
  document.removeEventListener('keydown', onEscKeydown);
};

export {closeModal};
