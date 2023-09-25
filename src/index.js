import './style.css';
import 'normalize.css';
import 'pubsub-js';
import './scripts/projectManager'

import ProjectLogic from './scripts/projectLogic';
import ProjectDisplay from './scripts/projectDisplay';
import AddTodoForm from './scripts/addTodoForm';
import ProjectManager from './scripts/projectManager'



ProjectManager.addProject('zero');
ProjectManager.addProject('raz'); 
ProjectManager.addProject('dwa'); 
ProjectManager.addProject('trzy');

const projects = ProjectLogic.getAllProjects();
console.log(projects)

ProjectManager.addTodo({
    title: 0,
    description: "super opis", 
    dueDate:'2023-12-12',
    creationDate:"2000-05-01",
    priority: "zadne"
});

ProjectDisplay.changeProject(1);

/*

projects[1].addTodo({
    title: 0,
    description: "super opis", 
    dueDate:'2023-12-12',
    creationDate:"2000-05-01",
    priority: "zadne"
});

*/