import './style.css';
import 'normalize.css';
import 'pubsub-js';
import './scripts/projectManager'

import ProjectLogic from './scripts/projectLogic';
import ProjectDisplay from './scripts/projectDisplay';
import AddTodoForm from './scripts/addTodoForm';
import ProjectManager from './scripts/projectManager';

ProjectManager.addProject('zero');
ProjectManager.addProject('raz'); 
ProjectManager.addProject('dwa'); 
ProjectManager.addProject('trzy');

const projects = ProjectLogic.getAllProjects();

ProjectManager.addTodo({
    title: 'Title 1',
    description: 'Fine description', 
    dueDate:'2023-12-12',
    creationDate:"2000-05-01",
    priority: 1
});
