// time ke liyyeee
let time = document.getElementById("current-time");
setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();    
}, 1000);

// Project management start hyaa
const projectInput = document.getElementById('projectInput');
const projectDateInput = document.getElementById('projectDate');
const addProjectButton = document.getElementById('addProjectButton');
const projectList = document.getElementById('projectList');
let currentProjectId = null;


const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
let tasks = {}; 


addProjectButton.addEventListener('click', addProject);

function addProject() {
    const projectText = projectInput.value.trim();
    const projectDate = projectDateInput.value.trim();

    if (projectText !== '') {
        const listItem = document.createElement('li');
        
        const projectSpan = document.createElement('span');
        projectSpan.textContent = projectText + (projectDate ? ` (Due: ${projectDate})` : '');
        listItem.appendChild(projectSpan);
        
        const projectId = Date.now().toString(); 
        listItem.dataset.projectId = projectId;
        tasks[projectId] = []; 

       
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select';
        selectButton.classList.add('select');
        selectButton.onclick = () => {
            document.querySelectorAll('#projectList li').forEach(item => item.classList.remove('active'));
            listItem.classList.add('active');
            currentProjectId = projectId;
            renderTasks();
        };
        listItem.appendChild(selectButton);

        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => {
            delete tasks[projectId];
            projectList.removeChild(listItem);
            if (currentProjectId === projectId) {
                taskList.innerHTML = '';
                currentProjectId = null;
            }
        };
        listItem.appendChild(deleteButton);

        projectList.appendChild(listItem);

     
        projectInput.value = '';
        projectDateInput.value = '';
    }
}


addTaskButton.addEventListener('click', addTask);


function addTask() {
    if (!currentProjectId) {
        alert('Please select a project first!');
        return;
    }

    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks[currentProjectId].push(taskText);
        renderTasks();

       
        taskInput.value = '';
    }
}


function renderTasks() {
    taskList.innerHTML = '';
    if (tasks[currentProjectId]) {
        tasks[currentProjectId].forEach((taskText, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

           
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.onclick = () => {
                tasks[currentProjectId].splice(index, 1);
                renderTasks();
            };
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
        });
    }
}

let editIndex = null;

        function sortTable(n) {
            const table = document.getElementById("task-table");
            let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            switching = true;
            dir = "asc"; 

            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];
                    if (dir === "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir === "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount === 0 && dir === "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        }

        function toggleForm() {
            const form = document.getElementById("task-form");
            form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
        }

        function addTask(event) {
            event.preventDefault();
            
            const name = document.getElementById("task-name").value;
            const active = document.getElementById("task-active").value;
            const deadline = document.getElementById("task-deadline").value;
            const createdBy = document.getElementById("task-created-by").value;
            const assignee = document.getElementById("task-assignee").value;
            const project = document.getElementById("task-project").value;
            const tags = document.getElementById("task-tags").value;
            
            const table = document.getElementById("task-table").getElementsByTagName("tbody")[0];
            
            if (editIndex === null) {
                const newRow = table.insertRow();
                insertRowCells(newRow, name, active, deadline, createdBy, assignee, project, tags);
            } else {
                const row = table.rows[editIndex];
                updateRowCells(row, name, active, deadline, createdBy, assignee, project, tags);
                editIndex = null;
            }

            document.getElementById("new-task-form").reset();
            toggleForm();
        }

        function insertRowCells(row, name, active, deadline, createdBy, assignee, project, tags) {
            row.insertCell(0).innerHTML = name;
            row.insertCell(1).innerHTML = active;
            row.insertCell(2).innerHTML = deadline;
            row.insertCell(3).innerHTML = createdBy;
            row.insertCell(4).innerHTML = assignee;
            row.insertCell(5).innerHTML = project;
            row.insertCell(6).innerHTML = tags;
            row.insertCell(7).innerHTML = ` <button onclick="deleteTask(this)">Delete</button>`;
         
        }

        function updateRowCells(row, name, active, deadline, createdBy, assignee, project, tags) {
            row.cells[0].innerHTML = name;
            row.cells[1].innerHTML = active;
            row.cells[2].innerHTML = deadline;
            row.cells[3].innerHTML = createdBy;
            row.cells[4].innerHTML = assignee;
            row.cells[5].innerHTML = project;
            row.cells[6].innerHTML = tags;
        }

        function deleteTask(button) {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }

        
       







