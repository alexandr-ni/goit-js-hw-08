import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  emailInput: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateTextarea();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  const string = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, string);
}

function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    refs.textarea.value = savedData.message || '';
    refs.emailInput.value = savedData.email || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  if (refs.textarea.value === '' || refs.emailInput.value === '') {
    return console.log(alert('All fields must be filled'));
  } else {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }

  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
