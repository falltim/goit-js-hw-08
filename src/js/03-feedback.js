import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const FORM_DATA = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(FORM_DATA)) ?? {};

feedbackForm.elements.email.value = formData.email ?? '';
feedbackForm.elements.message.value = formData.message ?? '';

const inputHandler = e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_DATA, JSON.stringify(formData));
};

const submitHandler = e => {
  e.preventDefault();

  if (feedbackForm.elements.email.value == '' || feedbackForm.elements.message.value == '') {
    return;
  }

  localStorage.removeItem(FORM_DATA);

  e.currentTarget.reset();
  console.log(formData);
};

feedbackForm.addEventListener('input', throttle(inputHandler, 500));
feedbackForm.addEventListener('submit', submitHandler);
