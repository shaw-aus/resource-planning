document.addEventListener('DOMContentLoaded', function () {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectSelect = document.getElementById('projectSelect');

    projects.forEach((project, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = project.projectName;
        projectSelect.appendChild(option);
    });
});

document.getElementById('addResourceForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const resourceName = document.getElementById('resourceName').value;
    const resourceRole = document.getElementById('resourceRole').value;
    const resourceEffort = document.getElementById('resourceEffort').value;
    const projectStartDate = document.getElementById('projectStartDate').value;
    const projectEndDate = document.getElementById('projectEndDate').value;
    const projectIndex = document.getElementById('projectSelect').value;

    const resourceItem = document.createElement('li');
    resourceItem.textContent = `${resourceName} - ${resourceRole} - ${resourceEffort} hrs/week from ${projectStartDate} to ${projectEndDate}`;

    document.getElementById('resources').appendChild(resourceItem);

    const resourceData = {
        resourceName,
        resourceRole,
        resourceEffort,
        projectStartDate,
        projectEndDate,
        projectIndex
    };

    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources.push(resourceData);
    localStorage.setItem('resources', JSON.stringify(resources));

    document.getElementById('addResourceForm').reset();
});
