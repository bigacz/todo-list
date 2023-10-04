function saveProjects(projects) {
    localStorage.setItem('project', projects);
}

export default { saveProjects }