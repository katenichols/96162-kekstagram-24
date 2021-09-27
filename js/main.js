const randomIntNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max === min) {
    return -1;
  } else if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //источник - MDN
}

const commentLengthCheck = (commentString, commentMaxLength) => {
  return commentString.length <= commentMaxLength;
}
