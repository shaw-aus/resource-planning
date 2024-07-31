document.addEventListener('DOMContentLoaded', function () {
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    const reportTableBody = document.querySelector('#reportTable tbody');

    resources.forEach(resource => {
        const { resourceName, resourceRole, resourceEffort, projectStartDate, projectEndDate } = resource;

        let startDate = new Date(projectStartDate);
        const endDate = new Date(projectEndDate);

        while (startDate <= endDate) {
            const weekEnd = new Date(startDate);
            weekEnd.setDate(startDate.getDate() + 6);

            const weekRow = document.createElement('tr');
            const weekCell = document.createElement('td');
            weekCell.textContent = `${startDate.toISOString().split('T')[0]} - ${weekEnd.toISOString().split('T')[0]}`;
            weekRow.appendChild(weekCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = resourceName;
            weekRow.appendChild(nameCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = resourceRole;
            weekRow.appendChild(roleCell);

            const hoursCell = document.createElement('td');
            hoursCell.textContent = resourceEffort;
            weekRow.appendChild(hoursCell);

            reportTableBody.appendChild(weekRow);

            startDate.setDate(startDate.getDate() + 7);
        }
    });
});
