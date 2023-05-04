
/*
        DATE
*/
const months = [ "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December" ];

let now = new Date();

let today = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

document.querySelector('#day').innerHTML = today;
document.querySelector('#month').innerHTML = months[month];
document.querySelector('#year').innerHTML = year;


/*
        MODAL WINDOW
*/

const closeBtn = document.querySelector('#close-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const addBtn = document.querySelector('#add-btn');
const addModal = document.querySelector('#add-modal');
const modalCover = document.querySelector('.modal-cover');

closeBtn.addEventListener('click', () => {
    addModal.classList.add('hidden');
    modalCover.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
    addModal.classList.add('hidden');
    modalCover.classList.add('hidden');
});

modalCover.addEventListener('click', () => {
    addModal.classList.add('hidden');
    modalCover.classList.add('hidden');
});

addBtn.addEventListener('click', () => {
    addModal.classList.remove('hidden');
    modalCover.classList.remove('hidden');
});

/*
        RENDER TO DO LIST
*/

const todoList = document.querySelector('#todo-list');
const addTodo = document.querySelector('#submit-btn');


let todoItems = [];

const complete = (i) => {
    todoItems[i].isComplete = !todoItems[i].isComplete;
    listfresher();
}

const listfresher = () => {
    todoList.innerHTML = '';
    renderTodos();
}

const renderTodos = () => {
    for (i in todoItems)
    {
        let item = todoItems[i];
        
        let template = 
        `<div class="todo-item ${item.isComplete ? 'complete' : ''}">
        <span id="checkbox" onClick="complete(${i})">${item.isComplete ? '<i class="fa fa-check"></i>' : ''}</span>
        
        <div class="todo-content">
            <p>${item.title}</p>
            <div class="due-date">
                <i class="fa fa-clock"></i>
                <span id="due-date">${item.date}</span>
            </div>
            <div class="category">
                <i class="fa fa-user"></i>
                <span id="category">${item.category}</span>
            </div>
        </div>

        <div class="actions">
            <div class="edit"><i class="fa fa-pen"></i></div>
            <div class="delete"><i class="fa fa-trash"></i></div>
        </div>
    </div>`;

    todoList.insertAdjacentHTML('beforeend', template);
    }
}

/*
        ADD TO DO ITEM
*/

addTodo.addEventListener('click', function(event) {
    event.preventDefault();

    let title = document.querySelector('#title').value;
    let dueDate = document.querySelector('#due-date').value;
    let category = document.querySelector('#category').value;
    let description = document.querySelector('#description').value;

    let form = document.querySelector('#add-form');
    
    let temp = {"title": title, "date": dueDate, "category": category, "description:": description, "isComplete": false};

    todoItems.push(temp);

    listfresher();
    addModal.classList.add('hidden');
    modalCover.classList.add('hidden');

    form.reset();
});

const addToLocalStorage = async() => {
    let localData = await localStorage.getItem('localTodoItems');

    let data = JSON.parse(localData);

    if (localData.length > 0) {
        todoItems = data;
    }

    listfresher();
}

/*
        DELETE TO DO ITEM
*/

let deleteTodo = document.querySelectorAll('.delete');


/*
        LOCAL STORAGE
*/

window.addEventListener('beforeunload', function(e) {
    let data = JSON.stringify(todoItems);
    localStorage.setItem('localTodoItems', data);
})

window.onload = () => {
    addToLocalStorage();
    renderTodos();
}