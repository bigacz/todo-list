function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function fetchProjects() {
    const projects = JSON.parse(localStorage.getItem('projects'));
    if(Array.isArray(projects)) {
        fixDates(projects);
    }

    return projects;
}

function fixDates(projects) {
    projects.forEach(element => {
        const todos = element.todos;
        
        todos.forEach(e => {
            e.creationDate = new Date(e.creationDate);
            e.dueDate = new Date(e.dueDate);
        })
    });
}

export default { 
    saveProjects,
    fetchProjects
}