document.getElementById('addProjectForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const clientName = document.getElementById('clientName').value;
    const projectStartDate = document.getElementById('projectStartDate').value;
    const projectEndDate = document.getElementById('projectEndDate').value;
    const budget = document.getElementById('budget').value;

    const projectData = {
        projectName,
        clientName,
        projectStartDate,
        projectEndDate,
        budget
    };

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(projectData);
    localStorage.setItem('projects', JSON.stringify(projects));

    document.getElementById('addProjectForm').reset();
});
