const getRandomArrayElement = (elements, count) => {
  const copyElements = elements.slice();
  const result = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * copyElements.length);
    result.push(copyElements[index]);
    copyElements.splice(index, 1);
  }
  return result;
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

export {getRandomArrayElement, escKey, debounce};
