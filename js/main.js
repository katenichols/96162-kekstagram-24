import {request} from './api.js';
import {renderPictures} from './fill-fragment.js';
import './big-picture.js';
import './upload-form.js';
import './hashtags-validity.js';
import './comments-validity.js';
import {errorDownloadMessage} from './messages.js';

const imgFilters = document.querySelector('.img-filters');

let descPicture = [];

const showFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
};



const onSuccess = (data) => {
  descPicture = data.slice();
  renderPictures(descPicture);
  showFilter();
};

const onError = (err) => {
  errorDownloadMessage(err);
};

request(onSuccess, onError, 'GET');

export {onSuccess, onError};
