const API_URL = '/api';

// Fetch all tasks
async function fetchTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    displayTasks(tasks);
}

// Display tasks in the list
function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'list-group-item task-item d-flex justify-content-between align-items-center';
        taskElement.innerHTML = `
            <div>
                <h5 class="mb-1">${task.title}</h5>
                <p class="mb-1">${task.description}</p>
                <small class="task-status status-${task.status}">${task.status}</small>
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-primary me-2" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(taskElement);
    });
}

// Add new task
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const task = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        status: document.getElementById('taskStatus').value
    };

    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });

    document.getElementById('taskForm').reset();
    fetchTasks();
});

// Edit task
async function editTask(taskId) {
    const response = await fetch(`${API_URL}/tasks/${taskId}`);
    const task = await response.json();

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description;
    document.getElementById('editTaskStatus').value = task.status;

    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();
}

// Save edited task
document.getElementById('saveEditBtn').addEventListener('click', async () => {
    const taskId = document.getElementById('editTaskId').value;
    const task = {
        title: document.getElementById('editTaskTitle').value,
        description: document.getElementById('editTaskDescription').value,
        status: document.getElementById('editTaskStatus').value
    };

    await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
    modal.hide();
    fetchTasks();
});

// Delete task
async function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        fetchTasks();
    }
}

// Initial load
fetchTasks();
