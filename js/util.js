// Функция получения элемента массива
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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// // Функция взята из интернета и доработана
// // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
// const throttle = (callback, delayBetweenFrames) => {
//   let lastTime = 0;

//   return (...rest) => {
//     const now = new Date();
//     if (now - lastTime >= delayBetweenFrames) {
//       callback.apply(this, rest);
//       lastTime = now;
//     }
//   };
// };

export {getRandomArrayElement, escKey, debounce};
