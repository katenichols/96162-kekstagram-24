import {body, uploadOverlay, uploadFile, openModal, uploadCancel, applyFilter, effectList,
  imgPreview, effectLevelSlider} from './upload-form.js';
import {onEscKeydown} from './esc-keydown.js';
import {bigPicture} from './big-picture.js';

const closeModal = () => {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  bigPicture.classList.add('hidden');
  imgPreview.style.filter = '';
  effectLevelSlider.noUiSlider.destroy();

  effectList.removeEventListener('click', applyFilter);
  uploadFile.removeEventListener('change', () => openModal());
  uploadCancel.removeEventListener('click', () => closeModal());
  document.removeEventListener('keydown', onEscKeydown);
};

export {closeModal};
