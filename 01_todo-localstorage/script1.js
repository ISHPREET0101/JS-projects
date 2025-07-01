document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const taskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = [] || JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));

  taskBtn.addEventListener(`click`, () => {
    const taskTest = input.value.trim();
    if (taskTest === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskTest,
      completed: false,
    };
    console.log(newTask);
    
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    input.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
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
        e.stopPropagation();
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
