let form = document.getElementById("taskForm");
let nom = document.getElementById("inputName");
let priority = document.getElementById("select-urgence");
let list = document.getElementById("list");
let taskDelete = document.getElementById("taskDelete");
let listForm = document.getElementById("listForm");
let message = document.getElementById("deleteMessage");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

class Task {
  constructor(name, prio) {
    this.name = name;
    this.prio = prio;
  }
}

tasks.forEach((task) => {
  addTaskToList(task);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let task = new Task(nom.value, priority.value);
  tasks.push(task);
  // Trier les tâches par priorité 
  tasks.sort((a, b) => a.prio - b.prio);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshTaskList();
  nom.value = "";
});

// Ajouter une tâche
function addTaskToList(task) {
  let check = document.createElement("input");
  check.type = "checkbox";
  let txt = document.createElement("span");
  let li = document.createElement("li");

  switch (task.prio) {
    case "1":
      txt.textContent = `${task.name} - Priorité: ${task.prio}`;
      txt.style.color = "red";
      break;
    case "2":
      txt.textContent = `${task.name} - Priorité: ${task.prio}`;
      txt.style.color = "orange";
      break;
    case "3":
      txt.textContent = `${task.name} - Priorité: ${task.prio}`;
      txt.style.color = "green";
      break;
    default:
      txt.textContent = `${task.name} - Priorité: ${task.prio}`;
  }

  // gestion des checkboxs
  check.addEventListener("change", () => {
    if (check.checked) {
      txt.style.textDecoration = "line-through";
    } else {
      txt.style.textDecoration = "none";
    }
  });

  // bouton de suppression des tâches
  taskDelete.addEventListener("click", (e) => {
    e.preventDefault();
    let newTasks = [];
    let checkboxs = list.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < tasks.length; i++) {
      if (checkboxs[i] && !checkboxs[i].checked) {
        newTasks.push(tasks[i]);
      }
    }
    tasks = newTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTaskList();
  });

  // Affichage
  li.append(check);
  li.appendChild(txt);
  list.append(li);
}

// Fonction pour rafraîchir la liste des tâches
function refreshTaskList() {
  list.innerHTML = "";
  tasks.forEach((task) => {
    addTaskToList(task);
  });
}
