const formWrapper = document.getElementById('add-todo-form-wrapper');
const formNode = document.getElementById('add-todo-form');
const activateButton = document.getElementById('todo-activate');

const formName = document.getElementById('todo-name');
const formDescription = document.getElementById('todo-description');
const formDueDate = document.getElementById('todo-due-date');
const formPriority = document.getElementById('todo-priority');
const formNotes = document.getElementById('todo-notes');
const formSubmit = document.getElementById('todo-submit');

activateButton.addEventListener('click', toggle)

function toggle() {
    formWrapper.classList.toggle('active');
}

export default {toggle}