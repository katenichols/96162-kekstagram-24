import {openModal, body} from './upload-form.js';
import {escKey} from './util.js';

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

const removeHandler = () => {
  body.removeChild(temporarySection);
};

const errorDownloadMessage = () => {
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

const onEscMessage = (evt) => {
  if(escKey(evt)) {
    removeHandler();
  }
};

document.addEventListener('keydown', onEscMessage);

export {errorDownloadMessage, successMessage, errorUploadMessage};
