import './style.css';
import Project from './scripts/todo';

Project.addProject('zero');
Project.addProject('raz');
Project.addProject('dwa');
Project.addProject('trzy');

const projects = Project.getAllProjects();

console.log(Project.getAllProjects());