import PubSub from 'pubsub-js';
import ProjectLogic from './projectLogic';
import ProjectDisplay from './projectDisplay';
import addTodoForm from './addTodoForm';
import storage from './projectStorage';
import projectStorage from './projectStorage';

window.addEventListener('DOMContentLoaded', loadProjects);

PubSub.subscribe('submitTodoForm', (msg, values) => {
    addTodo(values);
})

PubSub.subscribe('deleteTodo', (msg, data) => {
    removeTodo(data.projectId, data.todoId);
})

PubSub.subscribe('removeCurrentProject', removeCurrentProject);

function loadProjects() {
    let projects = projectStorage.fetchProjects();
    if(projects == null) {
        projects = [];
    }

    projects.forEach(e => {
        ProjectDisplay.addProject(ProjectLogic.projectId, e.title);
        ProjectLogic.addProject(e.title);

        const latestProject = ProjectLogic.getLatestProject();

        const todos = e.todos;
        todos.forEach((e) => {
            latestProject.addTodo(e);
        })

    });

    if(ProjectLogic.getAllProjects().length === 0) {
        addProject('All');
    }
    ProjectDisplay.updateProject();
}

function removeCurrentProject() {
    const projectId = ProjectDisplay.getCurrentProjectId();
    if(projectId != 0) {
        ProjectLogic.removeProject(projectId);
        ProjectDisplay.removeProject(projectId);
    }
    ProjectDisplay.changeProject(0);

    updateStorage()
}

function addProject(title) {
    const currentProjectId = ProjectLogic.projectId;
    ProjectDisplay.addProject(currentProjectId, title);
    ProjectLogic.addProject(title);

    ProjectDisplay.changeProject(currentProjectId)

    updateStorage()
}

function addTodo(values) {
    const project = getCurrentProject();
    project.addTodo(values);
    ProjectDisplay.updateProject()

    updateStorage()
}

function removeTodo(projectId, todoId) {
    const project = ProjectLogic.getProject(+projectId);

    project.deleteTodo(+todoId);

    updateStorage()
}

// Private functions //

function getCurrentProject() {
    const id = ProjectDisplay.getCurrentProjectId();
    const project = ProjectLogic.getProject(id);
    
    return project
}

function updateStorage() {
    projectStorage.saveProjects(ProjectLogic.getAllProjects());
}

export default { 
    addProject,
    addTodo 
}
