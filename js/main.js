import {request} from './api.js';
import {renderPictures} from './fill-fragment.js';
import './big-picture.js';
import './upload-form.js';
// import './hashtags-validity.js';
import './comments-validity.js';
import {errorMessage} from './messages.js';

let descPicture = [];

const onSuccess = (data) => {
  descPicture = data.slice();
  renderPictures(descPicture);
};

const onError = (err) => {
  errorMessage(err);
};

request(onSuccess, onError, 'GET');

export {onSuccess, onError};
