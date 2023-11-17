import PubSub from 'pubsub-js';
import Misc from './misc';

const formWrapper = document.getElementById('remove-project-form-wrapper');
const openButton = document.getElementById('remove-project-button');
const confirmButton = document.getElementById('remove-project-confirm');
const cancelButton = document.getElementById('remove-project-cancel');

formWrapper.addEventListener('click', (e) => {
  if (e.target.id === formWrapper.id) {
    toggle();
  }
});

openButton.addEventListener('click', toggle);
cancelButton.addEventListener('click', toggle);

confirmButton.addEventListener('click', () => {
  PubSub.publish('removeCurrentProject');
  toggle();
});

function toggle() {
  formWrapper.classList.toggle('active');
  Misc.bodyToggleModal();
}

export default {};
