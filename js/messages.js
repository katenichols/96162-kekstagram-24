import {closeModal} from './close-modal.js';
import {openModal, body} from './upload-form.js';

const errorDownloadTemplate = document.querySelector('#error-download')
  .content
  .querySelector('.error-download');
const errorUploadTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successUploadTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

// Обработчик нажания на Esc
const onEscKeydown = (evt) => {
  if ((evt.key === 'Escape' ||
    evt.key === 'Esc') &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')) {
    closeModal();
  }
};

document.addEventListener('keydown', onEscKeydown);

const removeHandler = (elem) => {
  closeModal();
  body.removeChild(elem);
};

const errorDownloadMessage = () => {
  const errorDownloadSection = errorDownloadTemplate.cloneNode(true);
  body.appendChild(errorDownloadSection);

  errorDownloadSection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error-download') ||
      evt.target.classList.contains('error__button')) {
      removeHandler(errorDownloadSection);
    }
  });
};

const successMessage = () => {
  const successSection = successUploadTemplate.cloneNode(true);
  body.appendChild(successSection);

  successSection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success') ||
      evt.target.classList.contains('success__button')) {
      removeHandler(successSection);
    }
  });
};

const errorUploadMessage = () => {
  const errorUploadSection = errorUploadTemplate.cloneNode(true);
  body.appendChild(errorUploadSection);

  errorUploadSection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error')) {
      removeHandler(errorUploadSection);
    }
    if (evt.target.classList.contains('error__button')) {
      removeHandler(errorUploadSection);
      openModal();
    }
  });
};

export {errorDownloadMessage, successMessage, onEscKeydown, errorUploadMessage};
