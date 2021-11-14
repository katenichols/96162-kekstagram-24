const body = document.querySelector('body');
const errorDownloadTemplate = document.querySelector('#error-download')
  .content
  .querySelector('.error');
const errorUploadTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successUploadTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

let errorSection;

const errorMessage = (markError) => {
  if (markError) {
    errorSection = errorDownloadTemplate.cloneNode(true);
    const errorButton = errorSection.querySelector('.error__button');
    errorButton.addEventListener('click', () => body.removeChild(errorSection));
    // window.location.reload();
  } else {
    errorSection = errorUploadTemplate.cloneNode(true);
    const errorButton = errorSection.querySelector('.error__button');
  }

  body.appendChild(errorSection);
};

const successMessage = () => {
  const successSection = successUploadTemplate.cloneNode(true);
  body.appendChild(successSection);
  const successButton = successSection.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    body.removeChild(successSection);
  });
};

export {errorMessage, successMessage};
