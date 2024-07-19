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
        if (e.target.tagName === 'BUTTON' && e.target.textContent === '🗑️') {
            if (confirm('Are you sure you want to delete this task?')) {
                const li = e.target.parentElement;
                li.classList.add('removing');
                li.addEventListener('animationend', () => {
                    taskList.removeChild(li);
                });
            }
        } else if (e.target.tagName === 'BUTTON' && e.target.textContent === '✏️') {
            const li = e.target.parentElement;
            const taskText = li.firstChild.textContent;
            const newTaskText = prompt('Edit task:', taskText);
            if (newTaskText !== null) {
                li.firstChild.textContent = newTaskText;
            }
        } else if (e.target.tagName === 'LI') {            
            e.target.classList.toggle('completed');
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        const editBtn = document.createElement('button');        
        editBtn.style.marginRight = '0'; // Remove extra spacing
        editBtn.textContent = '✏️';
        li.appendChild(editBtn);
        
        const deleteBtn = document.createElement('button');        
        deleteBtn.style.marginLeft = '0'; // Remove extra spacing
        deleteBtn.textContent = '🗑️';
        li.appendChild(deleteBtn);        
        taskList.appendChild(li);
    }
});
