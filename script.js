document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Store tasks in this array in memory
    let tasks = [];

    // Save tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create and append a task <li> with remove button, given text and id
    function createTaskElement(taskText, id) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.dataset.id = id;  // store task id on element for easy lookup

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', () => {
            // Remove task from DOM
            taskList.removeChild(li);
            // Remove task from array by id
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    // Add a task (from input or passed text), optionally saving it
    function addTask(taskText = null, save = true) {
        // If no text passed, get from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Generate unique id for task (timestamp + random number)
        const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();

        // Add to in-memory array
        tasks.push({ id, text: taskText });

        // Create DOM element
        createTaskElement(taskText, id);

        // Save updated tasks array
        if (save) {
            saveTasks();
        }

        // Clear input field only if task was from input
        if (taskText === taskInput.value.trim()) {
            taskInput.value = '';
        }
    }

    // Load tasks from localStorage and render them (without saving again)
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        tasks.forEach(task => {
            createTaskElement(task.text, task.id);
        });
    }

    // Initial load
    loadTasks();

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

