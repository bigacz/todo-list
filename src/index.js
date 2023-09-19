import './style.css';
import Project from './scripts/todo';

Project.addProject('zero');
Project.addProject('raz');
Project.addProject('dwa');
Project.addProject('trzy');

const projects = Project.getAllProjects();

projects[1].addTodo('0');
projects[1].addTodo('1');
projects[1].addTodo('2');
projects[1].addTodo('3');
projects[1].addTodo('4');
projects[1].addTodo('6');
projects[1].addTodo('7');
projects[1].addTodo('8');

console.log(projects[1]);

projects[1].deleteTodo(2)
projects[1].deleteTodo(3)

console.log(Project.getAllProjects());