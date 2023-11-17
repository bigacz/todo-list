import projectManager from './projectManager';
import Misc from './misc';

const addButton = document.getElementById('project-add-button');
const formWrapper = document.getElementById('add-project-form-wrapper');
const submitButton = document.getElementById('project-submit');
const exitButton = document.getElementById('project-exit');
const nameInput = document.getElementById('add-project-form-name');

exitButton.addEventListener('click', () => {
  toggle();
  clearInput();
});

addButton.addEventListener('click', add);
formWrapper.addEventListener('click', (e) => {
  if (e.target.id === formWrapper.id) {
    toggle();
  }
});

submitButton.addEventListener('click', handleSubmit);

function handleSubmit(event) {
  if (nameInput.checkValidity()) {
    event.preventDefault();
    projectManager.addProject(nameInput.value);
    toggle();
    clearInput();
  }
}

function toggle() {
  formWrapper.classList.toggle('active');

  Misc.bodyToggleModal();
}

function add() {
  formWrapper.classList.add('active');

  Misc.bodyAddModal();
}

function clearInput() {
  nameInput.value = '';
}

function checkActive() {
  return formWrapper.classList.contains('active');
}

export default { toggle, checkActive };
