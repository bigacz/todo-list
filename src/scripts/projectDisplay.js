import ProjectLogic from './projectLogic';
import 'pubsub-js';


const todosContainer = document.getElementById('todos-container');
const projectNameNode = document.getElementById('project-name');

const projectContainer = document.getElementById('project-container');

let currentProjectId = 1;

function addProject(id, name) {
    const projectButton = document.createElement('button');
    projectButton.textContent = name;
    projectButton.setAttribute('data-id', id);

    projectButton.addEventListener('click', (e) => {
        const projectId = e.currentTarget.getAttribute('data-id')

        changeProject(projectId);
    })

    projectContainer.appendChild(projectButton);
}

function getCurrentProjectId() {
    return currentProjectId
}

function changeProject(projectId) {
    currentProjectId = projectId;
    updateProject();
}

function updateProject() {
    const projectId = +currentProjectId;
    const currentProject = ProjectLogic.getProject(projectId);
    projectNameNode.textContent = currentProject.title;

    unappendTodos();

    let todos = [];
    if(projectId === 0) {
        const projects = ProjectLogic.getAllProjects();

        projects.forEach((e) => {
            const todosArray = e.getAllTodos();
            todos.push(...todosArray);
        })
    } else {
        todos = currentProject.getAllTodos();
    }

    appendTodos(todos);
}

// Private functions //

function appendTodos(todos) {
    if(todos.length === 0) {
        const paragraph = document.createElement('p');
        paragraph.textContent = 'No todos!'
        todosContainer.appendChild(paragraph);
    }
    todos.forEach(element => {
        const node = document.createElement('div');
        const title = document.createElement('h2');
        const description = document.createElement('p');
        const dueDate = document.createElement('span');
        const creationDate = document.createElement('span');
        const deleteButton = document.createElement('button');
        
        title.textContent = element.title;
        description.textContent = element.description;
        dueDate.textContent = element.dueDate;
        creationDate.textContent = element.creationDate;
        deleteButton.textContent = '✓';

        let priority;
        switch(element.priority) {
            case 0: 
                priority = 'low';
                break;
            case 1: 
                priority = 'medium';
                break;
            case 2: 
                priority = 'high';
                break;
        }
        node.classList.toggle('todo')
        node.classList.toggle(priority);

        
        deleteButton.addEventListener('click', handleDelete)
        
        node.setAttribute('data-todo-id', element.id);
        node.setAttribute('data-project-id', element.projectId);
        node.append(title, description, dueDate, creationDate, deleteButton);
        todosContainer.appendChild(node);
    });
}

// Private //


function handleDelete(e) {
    const node = e.currentTarget.parentElement;
        const todoId = node.getAttribute('data-todo-id');
        const projectId = node.getAttribute('data-project-id');

        PubSub.publishSync('deleteTodo', {projectId: projectId, 
            todoId: todoId
        });
        node.remove();
        
        updateProject();
}

function unappendTodos() {
    while(todosContainer.childElementCount > 0) {
        todosContainer.removeChild(todosContainer.firstChild);
    }
}

export default {
    addProject,
    changeProject,
    updateProject,
    getCurrentProjectId
};