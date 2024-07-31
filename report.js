document.addEventListener('DOMContentLoaded', function () {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    const reportTableHead = document.querySelector('#reportTable thead tr');
    const reportTableBody = document.querySelector('#reportTable tbody');
    const reportTableFoot = document.querySelector('#reportTable tfoot tr');

    if (resources.length === 0) return;

    // Get project details
    const projectIndex = resources[0].projectIndex;
    const project = projects[projectIndex];

    document.getElementById('projectName').textContent = `Project Name: ${project.projectName}`;
    document.getElementById('clientName').textContent = `Client Name: ${project.clientName}`;
    document.getElementById('projectDates').textContent = `Project Dates: ${project.projectStartDate} to ${project.projectEndDate}`;
    document.getElementById('budget').textContent = `Budget: $${project.budget}`;

    // Determine the start and end dates of the project
    let minDate = new Date(project.projectStartDate);
    let maxDate = new Date(project.projectEndDate);

    // Generate weeks
    const weeks = [];
    let currentDate = new Date(minDate);
    while (currentDate <= maxDate) {
        const weekStart = new Date(currentDate);
        const weekEnd = new Date(currentDate);
        weekEnd.setDate(currentDate.getDate() + 6
