window.addEventListener('load', () => {
    displayDate();
    displayModal(); 

    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList = document.querySelector("#todo-list");
    todoForm = document.querySelector('#add-form');
    submitBtn = document.querySelector('#submit-btn'); 
    saveBtn = document.querySelector('#save-btn'); 

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        title = document.querySelector('#title');
        dueDate = document.querySelector('#date');
        category = document.querySelector('#category');
        description = document.querySelector('#description');

        const todo = {
            "title": title.value,
            "date": dueDate.value,
            "category": category.value,
            "description": description.value,
            "done": false,
            "createdAt": new Date().getTime()
        };


        console.log(todo);

        todos.push(todo);
        
        localStorage.setItem('todos', JSON.stringify(todos));

        listRefresher();

        addModal.classList.add('hidden');
        modalCover.classList.add('hidden');
    });

    listRefresher();
})

function displayTodos() {

    todoList.innerHTML = '';
    
    for (i in todos){

        let item = todos[i];
        
        let template = 
        `<div class="todo-item ${item.done ? 'complete' : ''}">
            <span id="checkbox" onClick="complete(${i})">${item.done ? '<i class="fa fa-check"></i>' : ''}</span>
            <div class="todo-content">
                <p>${item.title}</p>
                <div class="due-date">
                    <i class="fa fa-clock"></i>
                    <span id="date">${item.date}</span>
                </div>
                <div class="category">
                    <i class="fa fa-user"></i>
                    <span id="category">${item.category}</span>
                </div>
            </div>

            <div class="actions">
                <div class="edit-btn"><i class="fa fa-pen"></i></div>
                <div class="delete-btn"><i class="fa fa-trash"></i></div>
            </div>
        </div>`;

        todoList.insertAdjacentHTML('beforeend', template);

    }

    activateDeleteListeners();
    activateEditListeners();

}

const complete = (i) => {
    todos[i].done = !todos[i].done;
    localStorage.setItem('todos', JSON.stringify(todos))
    listRefresher();
}

const listRefresher = () => {
    todoList.innerHTML = '';
    displayTodos();
}

/*
        DELETE TO DO ITEM
*/

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll('.delete-btn');
    deleteBtn.forEach((db, i) => {
        db.addEventListener('click', () => {deleteItem(i)})
    })
}

function deleteItem(i) {
    todos.splice(i, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    listRefresher();
}

/*
        EDIT TO DO ITEM
*/

function activateEditListeners() {
    let editBtn = document.querySelectorAll('.edit-btn');
    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {editItem(i)});
    })
}

function editItem(i) {
    modalTitle.innerHTML = 'Edit Item';
    addModal.classList.remove('hidden');
    modalCover.classList.remove('hidden');

    saveBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    cancelBtn.classList.remove('hidden');

    title.value = todos[i].title;
    date.value = todos[i].dueDate;
    category.value = todos[i].category;
    description.value = todos[i].description;

    saveBtn.addEventListener('click', () => {
        updateItem(i);
    })
}

function updateItem(i){
    todos[i].title = title.value;
    todos[i].dueDate = date.value;
    todos[i].category = category.value;
    todos[i].description = description.value;

    localStorage.setItem('todos', JSON.stringify(todos));
    listRefresher();
}

/*
        DATE
*/

function displayDate(){
    const months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];

    let now = new Date();

    let today = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();

    document.querySelector('#day').innerHTML = today;
    document.querySelector('#month').innerHTML = months[month];
    document.querySelector('#year').innerHTML = year;
}

/*
        MODAL WINDOW
*/

function displayModal() {
    modalTitle = document.querySelector(".modal-title")
    addModal = document.querySelector('#add-modal');
    modalCover = document.querySelector('.modal-cover');

    const closeBtn = document.querySelector('#close-btn');
    cancelBtn = document.querySelector('#cancel-btn');
    const addBtn = document.querySelector('#add-btn');

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
        todoForm.reset();

        modalTitle.innerHTML = 'Add Item';
        addModal.classList.remove('hidden');
        modalCover.classList.remove('hidden');

        submitBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
    });
}