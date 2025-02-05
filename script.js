"use strict";
let list = [];

function addToList(title, description) {
  list.push({
    title: `${title}`,
    description: `${description}`,
    status: false,
  });
}

function listDisplay() {
  document.querySelector("#task_list").innerHTML = "";
  document.querySelector(".error").style.opacity = 0;
  document.querySelector("input[name='task_title']").value = "";
  document.querySelector("textarea[name='task_description']").value = "";

  for (let i = 0; i < list.length; i++) {
    const tasklist = document.querySelector(".tasklist");
    const newCart = document.createElement("div");

    newCart.innerHTML = `<div id="item_${i}" class="tasklist_item_check" onclick="tasklist_item_check(${i})"></div><div class="tasklist_item_data"><h3>${list[i].title} </h3> <p>${list[i].description}</p></div> <div class="tasklist_item_button"> <button class="remove_task" onclick="removeTask(${i})">Remove</button> <button class="edit_task" onclick="editTask(${i})">Edit</button> </div>`;
    newCart.classList.add("tasklist_item");
    newCart.classList.add(`task${i}`);
    tasklist.appendChild(newCart);

    if (list[i].status) {
      document.querySelector(`#item_${i}`).style.backgroundColor = "#77E4C8";
      document.querySelector(`.task${i}`).style.backgroundColor = "#4DA1A9";
      document.querySelector(`.task${i} H3`).style.textDecorationLine =
        "line-through";
      document.querySelector(`.task${i} p`).style.textDecorationLine =
        "line-through";
    } else {
      document.querySelector(`#item_${i}`).style.backgroundColor = "#fff";
      document.querySelector(`.task${i}`).style.backgroundColor = "#36c2ce";
      document.querySelector(`.task${i} H3`).style.textDecorationLine = "none";
      document.querySelector(`.task${i} p`).style.textDecorationLine = "none";
    }
  }
}

const newTask = function () {
  let task_title = document.querySelector("input[name='task_title']").value;
  let task_description = document.querySelector(
    "textarea[name='task_description']"
  ).value;
  const isWhitespaceString = (str) => !/\S/.test(str);

  if (task_title == " " || !task_title || isWhitespaceString(task_title)) {
    document.querySelector(".error").style.opacity = 1;
    document.querySelector(".error").innerText = "You need to add a task title";
    return;
  }

  addToList(task_title, task_description);
  listDisplay();
};

const removeTask = function (taskID) {
  list.splice(taskID, 1);
  document.querySelector("#task_list").innerHTML = "";
  document.querySelector(`input[type="button"]`).onclick = () => {
    newTask();
  };
  document.querySelector(`input[type="button"]`).value = "Add Task";
  listDisplay();
};

const editTask = function (taskID) {
  document.querySelector("input[name='task_title']").value = list[taskID].title;
  document.querySelector("textarea[name='task_description']").value =
    list[taskID].description;
  document.querySelector(`input[type="button"]`).value = "Edit Task";
  document.querySelector(`input[type="button"]`).onclick = () => {
    let task_title = document.querySelector("input[name='task_title']").value;
    let task_description = document.querySelector(
      "textarea[name='task_description']"
    ).value;
    const isWhitespaceString = (str) => !/\S/.test(str);

    if (task_title == " " || !task_title || isWhitespaceString(task_title)) {
      document.querySelector(".error").style.opacity = 1;
      document.querySelector(".error").innerText =
        "You need to add a task title";
      return;
    }

    // Use map() to update the task
    list = list.map((task, index) => {
      if (index === taskID) {
        return { ...task, title: task_title, description: task_description };
      }
      return task;
    });

    listDisplay();
    document.querySelector(`input[type="button"]`).value = "Add Task";
    document.querySelector(`input[type="button"]`).onclick = () => {
      newTask();
    };
  };
};

const tasklist_item_check = function (item) {
  // Use map() to toggle the status
  list = list.map((task, index) => {
    if (index === item) {
      return { ...task, status: !task.status };
    }
    return task;
  });
  listDisplay();
};

listDisplay();
