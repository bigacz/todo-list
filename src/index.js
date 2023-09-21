import './style.css';
import 'normalize.css';
import Project from './scripts/todo';
import ProjectGui from './scripts/projectGui'
import AddTodoForm from './scripts/addTodoForm'


Project.addProject('zero');
Project.addProject('raz');
Project.addProject('dwa');
Project.addProject('trzy');

const projects = Project.getAllProjects();

projects[1].addTodo(0, "super opis", '2023-12-12', "2000-05-01", "zadne");
projects[1].addTodo(1, "super opis", '2023-12-12', "2000-05-01", "zadne");
projects[1].addTodo(2, "super opis", '2023-12-12', "2000-05-01", "zadne");
projects[1].addTodo(3, "super opis", '2023-12-12', "2000-05-01", "zadne");
projects[1].addTodo(4, "super opis", '2023-12-12', "2000-05-01", "zadne");
projects[1].addTodo(6, "super opis", '2023-12-12', "2000-05-01", "zadne");
projects[1].addTodo(7, "super opis", '2023-12-12', "2000-05-01", "zadne");
projects[1].addTodo(8, "super opis", '2023-12-12', "2000-05-01", "zadne");

projects[1].deleteTodo(2)
projects[1].deleteTodo(3)

console.log(projects[1]);

ProjectGui.addProject(projects[1]);
