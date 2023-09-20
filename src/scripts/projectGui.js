const projectNode = document.getElementById('todos-container');
const projectNameNode = document.getElementById('project-name');

function addProject(project) {
    projectNameNode.textContent = project.title;

    addTodos(project.todos)
}

function addTodos(todos){
    todos.forEach(element => {
        const node = document.createElement('div');
        const title = document.createElement('h2');
        const description = document.createElement('p');
        const dueDate = document.createElement('span');
        const creationDate = document.createElement('span');

        title.textContent = element.title;
        description.textContent = element.description;
        dueDate.textContent = element.dueDate;
        creationDate.textContent = element.creationDate;


        node.append(title, description, dueDate, creationDate);
        projectNode.appendChild(node);
    });
} 

function removeTodos() {
    while(projectNode.childElementCount > 0) {
        projectNode.removeChild(projectNode.firstChild);
    }
}

export default {addProject, addTodos, removeTodos};