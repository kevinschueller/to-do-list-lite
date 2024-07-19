document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
      }
    }
  });

  const clearCompletedBtn = document.getElementById("clear-completed-btn");

  clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = taskList.querySelectorAll(".completed");
    completedTasks.forEach((task) => taskList.removeChild(task));
  });

  taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      if (e.target.textContent === "🗑️") {
        if (confirm("Are you sure you want to delete this task?")) {
          const li = e.target.closest("li");
          li.classList.add("removing");
          li.addEventListener("animationend", () => {
            taskList.removeChild(li);
          });
        }
      } else if (e.target.textContent === "✏️") {
        const li = e.target.closest("li");
        const taskSpan = li.querySelector(".task-text");
        const taskText = taskSpan.textContent;
        const newTaskText = prompt("Edit task:", taskText);
        if (newTaskText !== null && newTaskText.trim() !== "") {
          taskSpan.textContent = newTaskText.trim();
        }
      }
    } else if (
      e.target.tagName === "LI" ||
      e.target.className === "task-text"
    ) {
      e.target.closest("li").classList.toggle("completed");
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.className = "task-text";
    li.appendChild(taskSpan);

    const buttonContainer = document.createElement("span");
    buttonContainer.style.whiteSpace = "nowrap";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    li.appendChild(buttonContainer);

    taskList.appendChild(li);
  }
});
