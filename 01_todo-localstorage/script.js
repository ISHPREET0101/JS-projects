document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  // Render existing tasks from localStorage
  addTaskButton.addEventListener(`click`, () => {
    const taskTest = todoInput.value.trim();
    if (taskTest === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskTest,
      completed: false,
    };          
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    // Clear input field after adding task
    todoInput.value = ""; //cleaer input field
    console.log(tasks);
  });

  function renderTask(task) {
    // console.log(task.text);
    const li = document.createElement(`li`);
    li.setAttribute(`data-id`, task.id);
    if (task.completed) li.classList.add(`completed`);
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>`;
    li.addEventListener(`click`, (e) => {
      if (e.target.tagName === `BUTTON`) {
        return;
      }
      task.completed = !task.completed;
      li.classList.toggle(`completed`);
      saveTasks();
    });

    li.querySelector(`button`).addEventListener(`click`, (e) => {
      e.stopPropagation(); // Prevent the click event from bubbling up to the li
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
  }
});
