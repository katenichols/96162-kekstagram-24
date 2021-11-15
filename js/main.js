import {request} from './api.js';
import {renderPictures} from './fill-fragment.js';
import './big-picture.js';
import './upload-form.js';
import './hashtags-validity.js';
import './comments-validity.js';
import {errorDownloadMessage, onEscKeydown} from './messages.js';

let descPicture = [];

document.addEventListener('keydown', onEscKeydown);

const onSuccess = (data) => {
  descPicture = data.slice();
  renderPictures(descPicture);
};

const onError = (err) => {
  errorDownloadMessage(err);
};

request(onSuccess, onError, 'GET');

export {onSuccess, onError};
