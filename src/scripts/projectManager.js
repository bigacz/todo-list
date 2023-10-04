import PubSub from 'pubsub-js';
import ProjectLogic from './projectLogic';
import ProjectDisplay from './projectDisplay';
import addTodoForm from './addTodoForm';
import storage from './storage';


PubSub.subscribe('submitTodoForm', (msg, values) => {
    addTodo(values);
})

PubSub.subscribe('deleteTodo', (msg, data) => {
    removeTodo(data.projectId, data.todoId);
})

PubSub.subscribe('removeCurrentProject', removeCurrentProject);

function removeCurrentProject() {
    const projectId = ProjectDisplay.getCurrentProjectId();
    if(projectId != 0) {
        ProjectLogic.removeProject(projectId);
        ProjectDisplay.removeProject(projectId);
    }
    ProjectDisplay.changeProject(0);
}

function addProject(title) {
    ProjectDisplay.addProject(ProjectLogic.projectId, title);
    ProjectLogic.addProject(title);
}

function addTodo(values) {
    const project = getCurrentProject();
    project.addTodo(values);
    ProjectDisplay.updateProject()
}

function removeTodo(projectId, todoId) {
    const project = ProjectLogic.getProject(+projectId);

    project.deleteTodo(+todoId);
}

// Private functions //

function getCurrentProject() {
    const id = ProjectDisplay.getCurrentProjectId();
    const project = ProjectLogic.getProject(id);
    
    return project
}

export default { 
    addProject,
    addTodo 
}

addProject('All');