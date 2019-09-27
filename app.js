//UI Varaiables
const form = document.querySelector('.task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all Event Listeners
loadEventListeners();

function loadEventListeners(){
    //Load Stored Tasks
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Event Task
    form.addEventListener('submit', addTask);
    //Remove Task Event
    taskList.addEventListener('click', removeTask);
    //Clear Tasks Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

//Getting Stored Tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create Text Node and Append to li
    li.appendChild(document.createTextNode(task));
    //Create New Link Element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append Link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    });
}

//Add Tasks
function addTask(e){
    if(taskInput.value === ''){
        alert("Add Task");
    }

    //Create li Element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create Text Node and Append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create New Link Element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append Link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store in Local Storage
    storeTask(taskInput.value);
    //Clear Input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task
function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Tasks
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure Want To Delete This Task ?')){
            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskLS(e.target.parentElement.parentElement);
        }
    }
}

//Remove from Local Storage
function removeTaskLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
    taskList.innerHTML = '';
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}