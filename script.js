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
