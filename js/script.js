const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const todoList = document.getElementById("todo-list");
const filterBtn = document.getElementById("filter-btn");

function renderEmpty() {
  const items = document.querySelectorAll("#todo-list li:not(.empty)");
  if (items.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No task found";
    todoList.appendChild(li);
  }
}

function clearEmpty() {
  const empty = document.querySelector(".empty");
  if (empty) empty.remove();
}

addBtn.addEventListener("click", function () {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Task and date must be filled!");
    return;
  }

  clearEmpty();

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${task}</span>
    <span class="task-date">${date}</span>
    <span class="task-status">Pending</span>
    <span><button class="delete-btn">Delete</button></span>
  `;

  todoList.appendChild(li);

  taskInput.value = "";
  dateInput.value = "";
});

todoList.addEventListener("click", function (e) {
  // delete
  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("li").remove();
    renderEmpty();
  }

  if (e.target.classList.contains("task-status")) {
    if (e.target.textContent === "Pending") {
      e.target.textContent = "Done";
      e.target.style.color = "#22c55e";
    } else {
      e.target.textContent = "Pending";
      e.target.style.color = "";
    }
  }
});

deleteAllBtn.addEventListener("click", function () {
  todoList.innerHTML = "";
  renderEmpty();
});

filterBtn.addEventListener("click", function () {
  const choice = prompt(
    `Filter by:
1 = By Date (exact date)
2 = By Month (from date input)
3 = By Year (from date input)
4 = By Status (Pending / Done)
5 = Show All`
  );

  const items = document.querySelectorAll("#todo-list li:not(.empty)");

  if (choice === "5" || choice === null) {
    items.forEach((item) => (item.style.display = "grid"));
    renderEmpty();
    return;
  }

  if (choice === "1") {
    if (!dateInput.value) {
      alert("Please select a date first!");
      return;
    }
    const selectedDate = dateInput.value;
    items.forEach((item) => {
      const itemDate = item.querySelector(".task-date").textContent;
      item.style.display = itemDate === selectedDate ? "grid" : "none";
    });
  }

  if (choice === "2") {
    if (!dateInput.value) {
      alert("Please select a date first!");
      return;
    }
    const [year, month] = dateInput.value.split("-");
    items.forEach((item) => {
      const [iy, im] = item.querySelector(".task-date").textContent.split("-");
      item.style.display = iy === year && im === month ? "grid" : "none";
    });
  }

  if (choice === "3") {
    if (!dateInput.value) {
      alert("Please select a date first!");
      return;
    }
    const year = dateInput.value.split("-")[0];
    items.forEach((item) => {
      const itemYear = item.querySelector(".task-date").textContent.split("-")[0];
      item.style.display = itemYear === year ? "grid" : "none";
    });
  }

  if (choice === "4") {
    const status = prompt("Type status: Pending or Done");
    if (!status) return;

    items.forEach((item) => {
      const itemStatus = item.querySelector(".task-status").textContent.toLowerCase();
      item.style.display =
        itemStatus === status.toLowerCase() ? "grid" : "none";
    });
  }

  const visibleItems = Array.from(items).filter(
    (item) => item.style.display !== "none"
  );

  if (visibleItems.length === 0) {
    clearEmpty();
    renderEmpty();
  } else {
    clearEmpty();
  }
});

renderEmpty();
