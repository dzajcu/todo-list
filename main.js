const createBtn = document.querySelector(".btn-create");
const clearBtn = document.querySelector(".clear");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completedBtn = document.querySelector(".completed");
const tasksLeft = document.querySelector(".tasks-left");
const deleteListBtn = document.querySelector(".delete-list");
const newTaskInput = document.querySelector(".new-task");
const todoList = document.querySelector(".todo-list__tasks");



createBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompletedTasks);
allBtn.addEventListener("click", showAllTasks);
activeBtn.addEventListener("click", showActiveTasks);
completedBtn.addEventListener("click", showCompletedTasks);
deleteListBtn.addEventListener("click", deleteList);
newTaskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

updateTasksLeft();

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        const task = document.createElement("div");
        task.classList.add("todo-list__task");
        task.innerHTML = `
        <input type="checkbox" id="task-${todoList.children.length + 1}" />
        <label for="task-${todoList.children.length + 1}">
          <span class="custom-checkbox"></span>
          ${taskText}
        </label>
      `;
        todoList.insertBefore(task, todoList.firstChild);
        newTaskInput.value = "";
        updateTasksLeft();
    }
}

function clearCompletedTasks() {
    const completedTasks = todoList.querySelectorAll(
        'input[type="checkbox"]:checked'
    );
    completedTasks.forEach((task) => task.parentElement.remove());
    updateTasksLeft();
}

function showAllTasks() {
    todoList
        .querySelectorAll(".todo-list__task")
        .forEach((task) => (task.style.display = "flex"));
}

function showActiveTasks() {
    todoList.querySelectorAll(".todo-list__task").forEach((task) => {
        if (task.querySelector('input[type="checkbox"]').checked) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
}

function showCompletedTasks() {
    todoList.querySelectorAll(".todo-list__task").forEach((task) => {
        if (task.querySelector('input[type="checkbox"]').checked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

function deleteList() {
    todoList.innerHTML = "";
    updateTasksLeft();
}

function updateTasksLeft() {
    const tasksLeftCount = todoList.querySelectorAll(
        'input[type="checkbox"]:not(:checked)'
    ).length;
    tasksLeft.textContent = `${tasksLeftCount} tasks left`;
}
