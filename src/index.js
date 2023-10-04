import './style.css';
import 'normalize.css';
import 'pubsub-js';
import './scripts/projectManager'

import ProjectManager from './scripts/projectManager';
import ProjectLogic from './scripts/projectLogic';
import addProjectForm from './scripts/addProjectForm';
import removeProjectform from './scripts/removeProjectForm';
import ProjectDisplay from './scripts/projectDisplay';
import AddTodoForm from './scripts/addTodoForm';
import todoView from './scripts/todoView';


ProjectManager.addProject('zero');
ProjectManager.addProject('raz'); 
ProjectManager.addProject('dwa'); 
ProjectManager.addProject('trzy');

const projects = ProjectLogic.getAllProjects();

ProjectManager.addTodo({
    title: 'Eeee',
    description: 'Fine description', 
    dueDate: new Date(2027, 10),
    notes: 'none',
    priority: 1
});

ProjectManager.addTodo({
    title: 'Aaaa',
    description: 'Fine description', 
    dueDate: new Date(2023, 10),
    notes: 'none',
    priority: 1
});

ProjectManager.addTodo({
    title: 'Cccc',
    description: 'Fine description', 
    dueDate: new Date(2026, 10),
    creationDate: new Date(2022, 10),
    notes: 'none',
    priority: 2
});

ProjectManager.addTodo({
    title: 'Bbbb',
    description: 'Fine description', 
    dueDate: new Date(2021, 10),
    notes: 'none',
    priority: 0
});

ProjectManager.addTodo({
    title: 'Ddddd',
    description: 'Fine description', 
    dueDate: new Date(2022, 10),
    notes: 'none',
    priority: 1
});

