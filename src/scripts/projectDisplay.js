import ProjectLogic from './projectLogic';
import sortTodos from './sortForm';
import 'pubsub-js';

const todosContainer = document.getElementById('todos-container');
const projectNameNode = document.getElementById('project-name');
const projectContainer = document.getElementById('project-container');

let currentProjectId = 0;

PubSub.subscribe('sortForm', updateProject);

function removeProject(id) {
    const projectButtons = Array.from(projectContainer.children);

    const node = projectButtons.find((e) => {
        const nodeId = e.getAttribute('data-id');
        const result = +nodeId === +id;
        return result
    })

    node.remove();
}

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

function appendTodos(pretodos) {

    let todos = sortTodos([...pretodos]);
    
    if(todos.length === 0) {
        const header = document.createElement('h2');
        header.textContent = 'No todos!'
        todosContainer.appendChild(header);

        return
    }
    const todoNodes = generate(todos);
    todoNodes.forEach((e) => {
        todosContainer.appendChild(e);
    })
}

// Private //

function generate(todos) {
    const returnNodes = [];
    todos.forEach(element => {
        const node = document.createElement('div');
        const title = document.createElement('h2');
        const description = document.createElement('p');
        description.classList.add('todo-description');
        const creationDate = document.createElement('span');
        const dueDate = document.createElement('span');
        dueDate.classList.add('todo-due-date');
        const deleteButton = document.createElement('button');
        
        title.textContent = element.title;
        description.textContent = element.description;

        const timeLeft = element.timeLeft;
        dueDate.textContent = timeLeft
        if(timeLeft === 'Overdue!') {
            dueDate.classList.add('text-red-bold');
        }
        creationDate.textContent = element.timeAgo;
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

        node.addEventListener('click', (e) => {
            if(e.target !== deleteButton) {
                handleNodeClick(e)
            }
        })

        deleteButton.addEventListener('click', handleDelete)
        
        node.setAttribute('data-todo-id', element.id);
        node.setAttribute('data-project-id', element.projectId);
        node.append(title, dueDate, description, creationDate, deleteButton);
        returnNodes.push(node);
    });
    
    return returnNodes
}

function handleNodeClick(e) {
    const node = e.currentTarget;
    const projectId = node.getAttribute('data-project-id');
    const todoId = node.getAttribute('data-todo-id');

    PubSub.publish('todoClicked', { todoId, projectId });
}

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
    getCurrentProjectId,
    removeProject
};