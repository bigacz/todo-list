import PubSub from 'pubsub-js';

const formWrapper = document.getElementById('add-todo-form-wrapper');
const formNode = document.getElementById('add-todo-form');
const activateButton = document.getElementById('todo-activate');

const formName = document.getElementById('todo-name');
const formDescription = document.getElementById('todo-description');
const formDueDate = document.getElementById('todo-due-date');
const formPriority = document.getElementById('todo-priority');
const formNotes = document.getElementById('todo-notes');
const formSubmit = document.getElementById('todo-submit');

const inputs = [formName, formDescription, formDueDate, formPriority, formNotes]

formSubmit.addEventListener('click', (e) => {
    if(checkValidity()) {
        PubSub.publish('submitTodoForm', getValues());

        toggle();
        clearInputs();
        
        e.preventDefault();
    }

})

formWrapper.addEventListener('click', (e) => {
    if(e.target.id === formWrapper.id) {
        toggle();
    }
});

activateButton.addEventListener('click', toggle)

function toggle() {
    formWrapper.classList.toggle('active');
}

function clearInputs() {
    inputs.forEach(e => {
        e.value = '';
    })
} 

function checkValidity() {
    let returnValue = true;
    inputs.forEach(e => {
        if(!e.checkValidity()) {
            returnValue = false;
        }
    })

    return returnValue
}

function getValues() {
    const currentDate = new Date()
    return {
        title: formName.value,    
        description: formDescription.value,
        dueDate: formDueDate.valueAsDate,
        creationDate: currentDate,
        priority: +formPriority.value,
        notes: formNotes.value
    }
}

export default {toggle}
