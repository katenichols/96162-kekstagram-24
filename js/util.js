// Функция получения случайного числа из диапазона
const getRandomIntNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return -1;
  } else if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //источник - MDN
};

// Функция получения элемента массива
const getRandomArrayElement = (elements) => elements[getRandomIntNumber(0, elements.length - 1)];

export {getRandomIntNumber, getRandomArrayElement};

const escKey = (evt) => {
  if ((evt.key === 'Escape' ||
    evt.key === 'Esc') &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')) {
    return true;
  }
};

export {escKey};
