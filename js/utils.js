import {body, temporarySection, onEscMessage} from './messages.js';

const getRandomArrayElement = (elements, count) => {
  const copyElements = elements.slice();
  const results = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * copyElements.length);
    results.push(copyElements[index]);
    copyElements.splice(index, 1);
  }
  return results;
};

const escKey = (evt) => {
  if ((evt.key === 'Escape' ||
    evt.key === 'Esc') &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')) {
    return true;
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const removeHandler = () => {
  body.removeChild(temporarySection);
  document.removeEventListener('keydown', onEscMessage);
};

export {getRandomArrayElement, escKey, debounce, removeHandler};
