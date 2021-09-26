function getRandomIntNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if ((max < min) || (max === min)) {
    const messageAlert = 'Введите максимальное число диапазона больше минимального';
    return messageAlert;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //источник - MDN
}

getRandomIntNumber(2,20);

function getMaxLengthComment(commentString, commentMaxLength) {
  const result = commentString.length <= commentMaxLength;
  return result;
}

getMaxLengthComment('Учтите, что диапазон может быть только положительный, включая ноль.',140);
