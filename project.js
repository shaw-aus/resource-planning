document.getElementById('addProjectForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const clientName = document.getElementById('clientName').value;

    const projectData = {
        projectName,
        clientName
    };

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(projectData);
    localStorage.setItem('projects', JSON.stringify(projects));

    document.getElementById('addProjectForm').reset();
});
