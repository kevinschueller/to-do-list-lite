document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });

    const clearCompletedBtn = document.getElementById('clear-completed-btn');

    clearCompletedBtn.addEventListener('click', () => {
        const completedTasks = taskList.querySelectorAll('.completed');
        completedTasks.forEach(task => taskList.removeChild(task));
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            li.classList.add('removing');
            li.addEventListener('animationend', () => {
                taskList.removeChild(li);
            });
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
});
