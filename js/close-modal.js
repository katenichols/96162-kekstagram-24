import {onEscKeydown} from './esc-keydown.js';
import {body, uploadOverlay, uploadFile} from './upload-form.js';
import {bigPicture} from './big-picture.js';

const closeModal = () => {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onEscKeydown);
};

export {closeModal};
