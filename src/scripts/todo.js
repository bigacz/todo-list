class Project {
    constructor(title) {
        this.title = title;
        this.id = Project.projectId;
        Project.projectId++;
    }

    static all = [];
    static projectId = 0;
    
    static addProject(title) {
        const newProject = new Project(title);
        console.log(newProject);

        this.all.push(newProject);
    }
    static getAllProjects() {
        return this.all;
    }
    static getProject(id) {
        const projectIndex = this.all.findIndex((e) => e.id === id);

        return this.all[projectIndex];
    }

    todoId = 0;
    todos = [];

    addTodo(title, description, dueDate, creationDate, notes, priority) {
        const newNote = new Todo(title, description, dueDate, creationDate, notes, 0, priority, this.todoId, this.id);
        this.todoId++;

        this.todos.push(newNote);
    }

    deleteTodo(id) {
        const todoIndex = this.todos.findIndex((e) => +e.todoId === +id);
        console.log(this.todos)
        console.log(todoIndex)
        if(todoIndex >= 0) {
            this.todos.splice(todoIndex, 1)
        }
    }
}

class Todo {
    constructor(title, description, dueDate, creationDate, notes, state, priority, todoId, projectId) {
        this.title = title; 
        this.description = description; 
        this.dueDate = dueDate;
        this.creationDate = creationDate; 
        this.notes = notes; 
        this.state = state; 
        this.priority = priority;
        this.todoId = todoId;
        this.projectId = projectId;
    }
}


export default Project