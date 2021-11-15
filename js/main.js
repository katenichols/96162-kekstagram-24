import {request} from './api.js';
import {pictures, renderPictures} from './fill-fragment.js';
import './big-picture.js';
import './upload-form.js';
import './hashtags-validity.js';
import './comments-validity.js';
import {errorDownloadMessage} from './messages.js';
import {getRandomArrayElement, debounce} from './util.js';

const MAX_RANDOM_PICTURES = 10;
const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const defaultButton = imgFilters.querySelector('#filter-default');
const randomButton = imgFilters.querySelector('#filter-random');
const discussedButton = imgFilters.querySelector('#filter-discussed');

let descPicture = [];

const showFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const clearPictures = () => {
  pictures.querySelectorAll('.picture').forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
};

const onDefaultButtonClick = () => {
  clearPictures();
  renderPictures(descPicture);
  defaultButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');
};

const onRandomButtonClick = () => {
  let randomDescPicture = [];
  for (let i = 0; i < MAX_RANDOM_PICTURES; i++) {
    randomDescPicture = getRandomArrayElement(descPicture, MAX_RANDOM_PICTURES);
  }
  clearPictures();
  renderPictures(randomDescPicture);
  defaultButton.classList.remove('img-filters__button--active');
  randomButton.classList.add('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');
};

const onDiscussedButtonClick = () => {
  const sortedDescPicture = descPicture.slice().sort((a, b) =>
    b.comments.length - a.comments.length);
  clearPictures();
  renderPictures(sortedDescPicture);
  defaultButton.classList.remove('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.add('img-filters__button--active');
};

const onSuccess = (data) => {
  descPicture = data.slice();
  renderPictures(descPicture);
  showFilter();

  defaultButton.addEventListener('click', debounce(onDefaultButtonClick, RERENDER_DELAY));
  randomButton.addEventListener('click', debounce(onRandomButtonClick, RERENDER_DELAY));
  discussedButton.addEventListener('click', debounce(onDiscussedButtonClick, RERENDER_DELAY));
};

const onError = (err) => {
  errorDownloadMessage(err);
};

request(onSuccess, onError, 'GET');

export {onSuccess, onError};
