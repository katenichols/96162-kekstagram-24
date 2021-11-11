import {body, uploadOverlay, uploadFile, openModal, uploadCancel, imgUploadEffectsGroup,
  onImgUploadEffectsGroupClick,   imgPreview, effectLevelSlider, onEscKeydown} from './upload-form.js';
import {bigPicture} from './big-picture.js';

// Функция закрытия окна редактирования картинки
const closeModal = () => {
  imgPreview.style.transform = 'scale(1)';
  effectLevelSlider.noUiSlider.reset();
  uploadFile.value = '';
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', () => onEscKeydown);
  imgUploadEffectsGroup.removeEventListener('click', onImgUploadEffectsGroupClick);
  uploadFile.removeEventListener('change', () => openModal());
  uploadCancel.removeEventListener('click', () => closeModal());
};

export {closeModal};
