import {textHashtags} from './upload-form.js';

const MAX_LENGTH_HASHTAG = 20;
const MAX_COUNT_HASHTAG = 5;

textHashtags.addEventListener('input', () => {
  textHashtags.setCustomValidity('');
  const invalidHashtagMessages = [];

  const inputText = textHashtags.value.toLowerCase().trim();

  const outlineIfNotError = () => {
    textHashtags.style.outline = 'none';
    textHashtags.style.outlineOffset = '0';
  };

  if (!inputText) {
    outlineIfNotError();
    return;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return;
  }

  const isFirtNotHashtag = inputArray.some((item) => item[0] !== '#');

  if (isFirtNotHashtag) {
    invalidHashtagMessages.push('Хештег должен начинаться с решётки');
  }

  const isOnlyHashtag = inputArray.some((item) => item === '#');

  if (isOnlyHashtag) {
    invalidHashtagMessages.push('Хештег не может состоять только из решётки');
  }

  const isSplitSpaceHashtag = inputArray.some((item) => item.indexOf('#', 1) >= 1);

  if (isSplitSpaceHashtag) {
    invalidHashtagMessages.push('Хештеги должны разделяться пробелами');
  }

  const isRepeatHashtag = inputArray.some((item, i, arr) => arr.indexOf(item, i + 1) >= i + 1);

  if (isRepeatHashtag) {
    invalidHashtagMessages.push('Не должно быть повторяющихся хештегов');
  }

  const isLongHashtag = inputArray.some((item) => item.length > MAX_LENGTH_HASHTAG);

  if (isLongHashtag) {
    invalidHashtagMessages.push('Максимальная длина одного хештега вместе с решёткой 20 символов');
  }

  if (inputArray.length > MAX_COUNT_HASHTAG) {
    invalidHashtagMessages.push('Может быть не более 5 хештегов');
  }

  if (invalidHashtagMessages.length > 0) {
    textHashtags.setCustomValidity(invalidHashtagMessages.join('. \n'));
    textHashtags.style.outline = '3px solid red';
    textHashtags.style.outlineOffset = '-2px';
  } else {
    outlineIfNotError();
  }

  textHashtags.reportValidity();
});
