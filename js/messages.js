import {openModal, body} from './upload-form.js';
import {escKey, removeHandler} from './utils.js';

const errorDownloadTemplate = document.querySelector('#error-download')
  .content
  .querySelector('.error-download');
const errorUploadTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successUploadTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

let temporarySection;

const onEscMessage = (evt) => {
  if (escKey(evt)) {
    removeHandler();
  }
};

const errorDownloadMessage = () => {
  document.addEventListener('keydown', onEscMessage);
  temporarySection = errorDownloadTemplate.cloneNode(true);
  body.appendChild(temporarySection);

  temporarySection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error-download') ||
      evt.target.classList.contains('error__button')) {
      removeHandler();
    }
  });
};

const successMessage = () => {
  document.addEventListener('keydown', onEscMessage);
  temporarySection = successUploadTemplate.cloneNode(true);
  body.appendChild(temporarySection);

  temporarySection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success') ||
      evt.target.classList.contains('success__button')) {
      removeHandler();
    }
  });
};

const errorUploadMessage = () => {
  document.addEventListener('keydown', onEscMessage);
  temporarySection = errorUploadTemplate.cloneNode(true);
  body.appendChild(temporarySection);

  temporarySection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error')) {
      removeHandler(temporarySection);
    }
    if (evt.target.classList.contains('error__button')) {
      removeHandler();
      openModal();
    }
  });
};

export {errorDownloadMessage, successMessage, errorUploadMessage,
  body, temporarySection, onEscMessage};
