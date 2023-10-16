import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths} from 'date-fns';

class Project {
    constructor(title) {
        this.title = title;
        this.id = Project.projectId;
        
        Project.projectId++;
    }

    static all = [];
    static projectId = 0;
    
    static addProject(title, projectId) {
        const newProject = new Project(title);

        Project.all.push(newProject);
    }
    static removeProject(id) {
        const projectIndex = this.all.findIndex((e) => +e.id === +id);

        if(projectIndex >= 0) {
            this.all.splice(projectIndex, 1)
        }
    }
    static getProject(id) {
        const projectIndex = Project.all.findIndex((e) => e.id === +id);
        
        return Project.all[projectIndex];
    }
    static getAllProjects() {
        return this.all;
    }
    static getLatestProject() {
        return this.getProject(this.projectId - 1);
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
    constructor(title, description, dueDate, creationDate, notes, priority, id, projectId) {
        this.title = title; 
        this.description = description; 
        this.dueDate = dueDate;
        this.notes = notes; 
        this.priority = priority;
        this.creationDate = creationDate === undefined ? new Date() : creationDate;

        this.id = id;
        this.projectId = projectId;
    }

    edit(values) {
        const keys = Object.keys(values);
        keys.forEach(key => {
            this[key] = values[key];
        })
    }

    get timeAgo() {
        const current = new Date();
        const creation = this.creationDate;

        const minutes = differenceInMinutes(current, creation);
        if(minutes < 2) {
            return `Just now`
        }
        if(minutes < 60) {
            return `${minutes} minutes ago`
        }
        
        const hours = differenceInHours(current, creation);
        if(hours < 24) {
            if(hours === 1){
                return `hour ago`
            }
            return `${hours} hours ago`
        }

        const days = differenceInDays(current, creation);
        if(days < 31) {
            if(days === 1) {
                return 'Day ago'
            }
            return `${days} days ago`
        }
        
        const months = differenceInMonths(current, creation);
        if(months < 12) {
            if(months === 1) {
                return 'Month ago'
            }
            return `${months} months ago`
        }
        
        return `More than 1 year ago`
    }

    get timeLeft() {
        const current = new Date();
        const dueDate = this.dueDate;
    
        const minutes = differenceInMinutes(dueDate, current);
        if(minutes <= 0) {
            return `Overdue!`
        }
        if(minutes == 1) {
            return `Minute left`
        }
        if(minutes < 60) {
            return `${minutes} minutes left`
        }
        
        const hours = differenceInHours(dueDate, current);
        if(hours < 24) {
            if(hours === 1){
                return `Hour left`
            }
            return `${hours} hours ago`
        }

        const days = differenceInDays(dueDate, current);
        if(days < 31) {
            if(days === 1) {
                return 'Day Left'
            }
            return `${days} days left`
        }
        
        const months = differenceInMonths(dueDate, current);
        if(months < 12) {
            if(months === 1) {
                return 'Month left'
            }
            return `${months} months left`
        }
        
        return `More than year left`    
        
    }
}

export default Project