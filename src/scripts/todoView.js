import PubSub from 'pubsub-js';
import ProjectLogic from './projectLogic';
import { formatISO, lightFormat } from 'date-fns';

const viewWrapper = document.getElementById('todo-view-wrapper');
const form = document.getElementById('todo-view');

const viewTitle = document.getElementById('todo-view-title');
const viewDescription = document.getElementById('todo-view-description');
const viewDueDate = document.getElementById('todo-view-due-date');
const viewCreationDate = document.getElementById('todo-view-creation-date');
const viewNotes = document.getElementById('todo-view-notes');
const viewProject = document.getElementById('todo-view-project');

const exitButton = document.getElementById('todo-view-exit');
const deleteButton = document.getElementById('todo-view-delete');

let cacheProjectId;
let cacheTodoId;

deleteButton.addEventListener('click', () => {
    handleDelete();
    toggle();
})

exitButton.addEventListener('click', toggle);

PubSub.subscribe('todoClicked', (msg, values) => {
    cacheProjectId = values.projectId;
    cacheTodoId = values.todoId;

    const project = ProjectLogic.getProject(cacheProjectId);
    const todo = project.getTodo(cacheTodoId);
    todo.project = project.title;

    changeValues(todo);
    toggle();
})

viewWrapper.addEventListener('click', (e) => {
    if(e.target.id === viewWrapper.id) {
        toggle();
        submit()
    }
})

function toggle() {
    viewWrapper.classList.toggle('active')
}

function submit() {
    const project = ProjectLogic.getProject(cacheProjectId);
    const todo = project.getTodo(cacheTodoId);
    const notes = viewNotes.value;

    todo.edit({notes});
}

function changeValues(valuesObject) {
    viewTitle.textContent = valuesObject.title
    viewDescription.textContent = valuesObject.description

    const dueDate = valuesObject.dueDate ?
        lightFormat(valuesObject.dueDate, 'dd-MM-yyyy') :
        'Not specified';
    viewDueDate.textContent = `Due: ${dueDate}`
    
    const creationDate = valuesObject.creationDate ?
        lightFormat(valuesObject.creationDate, 'dd-MM-yyyy') :
        'Not specified';
    viewCreationDate.textContent = `Created: ${creationDate}`

    let priorityClass;
    switch(valuesObject.priority) {
        case 0:
            priorityClass = 'low';
            break;
        case 1:
            priorityClass = 'medium';
            break;
        case 2:
            priorityClass = 'high';
            break;
    }

    const priorities = ['low', 'medium', 'high']
    priorities.forEach(e => {
        form.classList.remove(e);
    })
    form.classList.add(priorityClass);
    
    viewProject.textContent = `Project: ${valuesObject.project}`
    
    viewNotes.value = valuesObject.notes;
}

function handleDelete() {
    PubSub.publishSync('deleteTodo', {
        projectId: cacheProjectId,
        todoId: cacheTodoId
    });
}

export default {}