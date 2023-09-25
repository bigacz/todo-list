import PubSub from 'pubsub-js';

import ProjectLogic from './projectLogic';
import ProjectDisplay from './projectDisplay';
import addTodoForm from './addTodoForm';

PubSub.subscribe('submitTodoForm', (msg, values) => {
    addTodo(values);
})

function addProject(title) {
    ProjectLogic.addProject('title');
    const project = getCurrentProject();

    ProjectDisplay.addProject(project.id, title);
}

function addTodo(values) {
    const project = getCurrentProject();
    project.addTodo(values);
    ProjectDisplay.updateProject()
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