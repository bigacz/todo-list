import ProjectLogic from './projectLogic';

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
        console.log(projectId);
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

    const currentProject = ProjectLogic.getProject(+currentProjectId);
    console.log(currentProject);
    projectNameNode.textContent = currentProject.title;
    removeTodos();
    addTodos(currentProject.getAllTodos());
}

// Private functions //

function addTodos(todos) {
    todos.forEach(element => {
        const node = document.createElement('div');
        const title = document.createElement('h2');
        const description = document.createElement('p');
        const dueDate = document.createElement('span');
        const creationDate = document.createElement('span');

        title.textContent = element.title;
        description.textContent = element.description;
        dueDate.textContent = element.dueDate;
        creationDate.textContent = element.creationDate;

        node.append(title, description, dueDate, creationDate);
        todosContainer.appendChild(node);
    });
} 

function removeTodos() {
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