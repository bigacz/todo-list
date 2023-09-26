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

        Project.all.push(newProject);
    }
    static getProject(id) {
        const projectIndex = Project.all.findIndex((e) => e.id === +id);
        
        return Project.all[projectIndex];
    }
    static getAllProjects() {
        return this.all;
    }

    todoId = 0;
    todos = [];

    addTodo(values) {
        const newNote = 
        new Todo(
            values.title, 
            values.description, 
            values.dueDate, 
            values.creationDate, 
            values.notes, 
            0, 
            values.priority, 
            this.todoId, 
            this.id
            );
        this.todoId++;

        this.todos.push(newNote);
    }
    deleteTodo(id) {
        const todoIndex = this.todos.findIndex((e) => +e.id === +id);

        if(todoIndex >= 0) {
            this.todos.splice(todoIndex, 1)
        }
    }
    getTodo(id) {
        const todoIndex = this.todos.findIndex((e) => +e.id === +id);

        return this.todos[todoIndex];
    }
    getAllTodos() {
        return this.todos
    }
}

class Todo {
    constructor(title, description, dueDate, creationDate, notes, state, priority, id, projectId) {
        this.title = title; 
        this.description = description; 
        this.dueDate = dueDate;
        this.creationDate = creationDate; 
        this.notes = notes; 
        this.state = state; 
        this.priority = priority;
        this.id = id;
        this.projectId = projectId;
    }
}

export default Project