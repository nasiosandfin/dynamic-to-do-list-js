// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // do not re-save while loading
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Get current tasks array from Local Storage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Create and append a task item; optionally save to Local Storage
    function addTask(taskTextOrEvent, save = true) {
        let taskText = typeof taskTextOrEvent === 'string'
            ? taskTextOrEvent
            : taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove task when button is clicked (update DOM and Local Storage)
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            const tasks = getTasks().filter(t => t !== taskText);
            saveTasks(tasks);
        };

        // Append remove button to list item
        li.appendChild(removeBtn);

        // Append list item to task list
        taskList.appendChild(li);

        // Save to Local Storage if requested
        if (save) {
            const tasks = getTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }

        // Clear input field when adding via UI interaction
        if (typeof taskTextOrEvent !== 'string') {
            taskInput.value = "";
        }
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing Enter in input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(event);
        }
    });

    // Initialize from Local Storage
    loadTasks();
});
