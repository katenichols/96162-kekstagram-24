import {textDescription} from './upload-form.js';

const MAX_COMMENT_LENGTH = 140;

textDescription.addEventListener('input', () => {
  textDescription.setCustomValidity('');

  const commentText = textDescription.value;

  if (commentText.length === MAX_COMMENT_LENGTH) {
    textDescription.setCustomValidity('Комментарий может быть не более 140 символов');
    textDescription.style.outline = '3px solid red';
    textDescription.style.outlineOffset = '-2px';
  } else {
    textDescription.style.outline = 'none';
  }

  textDescription.reportValidity();
});
