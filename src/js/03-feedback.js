import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  emailInput: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateTextarea();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    refs.textarea.value = savedData.message;
    refs.emailInput.value = savedData.email;
    if (refs.textarea.value === 'undefined') {
      return (refs.textarea.value = '');
    }
    if (refs.emailInput.value === 'undefined') {
      return (refs.emailInput.value = '');
    }
  }

  if (savedData === null) {
    return;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (refs.textarea.value === '' || refs.emailInput.value === '') {
    return console.log(alert('All fields must be filled'));
  } else {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }

  formData = {};
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
