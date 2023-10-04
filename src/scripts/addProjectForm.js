import PubSub from 'pubsub-js';
import projectManager from './projectManager';

const addButton = document.getElementById('project-add-button');
const formWrapper = document.getElementById('add-project-form-wrapper');
const submitButton = document.getElementById('project-submit');

addButton.addEventListener('click', toggle);
formWrapper.addEventListener('click', (e) => {
    if(e.target.id === formWrapper.id) {
        toggle();
    }
})

submitButton.addEventListener('click', handleSubmit)

function handleSubmit() {
    const nameInput = document.getElementById('add-project-form-name');
    projectManager.addProject(nameInput.value);
    toggle();
    nameInput.value = ''
}

function toggle() {
    formWrapper.classList.toggle('active');
}

export default {toggle}