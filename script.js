document.getElementById('addResourceForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const resourceName = document.getElementById('resourceName').value;
    const resourceRole = document.getElementById('resourceRole').value;

    const resourceItem = document.createElement('li');
    resourceItem.textContent = `${resourceName} - ${resourceRole}`;

    document.getElementById('resources').appendChild(resourceItem);

    document.getElementById('addResourceForm').reset();
});
