document.addEventListener('DOMContentLoaded', function () {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    const reportTableHead = document.querySelector('#reportTable thead tr');
    const reportTableBody = document.querySelector('#reportTable tbody');
    const reportTableFoot = document.querySelector('#reportTable tfoot tr');

    if (resources.length === 0) return;

    // Create a unique set of project indices from resources
    const projectIndices = [...new Set(resources.map(resource => resource.projectIndex))];

    projectIndices.forEach(projectIndex => {
        const project = projects[projectIndex];

        const projectRow = document.createElement('tr');
        const projectCell = document.createElement('td');
        projectCell.colSpan = reportTableHead.children.length;
        projectCell.textContent = `${project.projectName} - ${project.clientName} (${project.projectStartDate} to ${project.projectEndDate})`;
        projectRow.appendChild(projectCell);
        reportTableBody.appendChild(projectRow);

        // Determine the start and end dates of the project
        let minDate = new Date(project.projectStartDate);
        let maxDate = new Date(project.projectEndDate);

        const projectResources = resources.filter(resource => resource.projectIndex === projectIndex);

        projectResources.forEach(resource => {
            const startDate = new Date(resource.projectStartDate);
            const endDate = new Date(resource.projectEndDate);

            if (startDate < minDate) minDate = startDate;
            if (endDate > maxDate) maxDate = endDate;
        });

        // Generate weeks
        const weeks = [];
        let currentDate = new Date(minDate);
        while (currentDate <= maxDate) {
            const weekStart = new Date(currentDate);
            const weekEnd = new Date(currentDate);
            weekEnd.setDate(currentDate.getDate() + 6);
            weeks.push({ start: weekStart, end: weekEnd });

            // Add week header
            const weekHeader = document.createElement('th');
            weekHeader.textContent = `${weekStart.toISOString().split('T')[0]} - ${weekEnd.toISOString().split('T')[0]}`;
            reportTableHead.appendChild(weekHeader);

            // Add total cell for each week in the footer
            const totalCell = document.createElement('th');
            totalCell.classList.add('total-hours');
            totalCell.textContent = '0';
            reportTableFoot.appendChild(totalCell);

            currentDate.setDate(currentDate.getDate() + 7);
        }

        // Populate table rows for each resource
        projectResources.forEach(resource => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = resource.resourceName;
            row.appendChild(nameCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = resource.resourceRole;
            row.appendChild(roleCell);

            weeks.forEach(week => {
                const weekCell = document.createElement('td');

                const resourceStartDate = new Date(resource.projectStartDate);
                const resourceEndDate = new Date(resource.projectEndDate);

                if (week.start <= resourceEndDate && week.end >= resourceStartDate) {
                    weekCell.textContent = resource.resourceEffort;
                } else {
                    weekCell.textContent = '0';
                }

                row.appendChild(weekCell);
            });

            reportTableBody.appendChild(row);
        });

        // Calculate total hours per week
        const rows = Array.from(reportTableBody.rows).filter(row => row !== projectRow);
        weeks.forEach((week, weekIndex) => {
            let totalHours = 0;
            rows.forEach(row => {
                const cellValue = parseFloat(row.cells[2 + weekIndex].textContent);
                totalHours += cellValue;
            });
            reportTableFoot.cells[2 + weekIndex].textContent = totalHours.toString();
        });
    });
});
