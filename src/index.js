import './style.css';
import 'normalize.css';
import 'pubsub-js';
import './scripts/projectManager'

import ProjectManager from './scripts/projectManager';
import ProjectLogic from './scripts/projectLogic';
import AddProjectForm from './scripts/addProjectForm';
import ProjectDisplay from './scripts/projectDisplay';
import AddTodoForm from './scripts/addTodoForm';

ProjectManager.addProject('zero');
ProjectManager.addProject('raz'); 
ProjectManager.addProject('dwa'); 
ProjectManager.addProject('trzy');

const projects = ProjectLogic.getAllProjects();

ProjectManager.addTodo({
    title: 'Title 1',
    description: 'Fine description', 
    dueDate: new Date(2024, 10),
    notes: 'none',
    priority: 1
});
