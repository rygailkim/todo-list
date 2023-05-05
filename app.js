window.addEventListener('load', () => {
    displayDate();
    displayModal(); 

    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList = document.querySelector("#todo-list");
    const todoForm = document.querySelector('#add-form');
    const submitBtn = document.querySelector('#submit-btn'); 

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let title = document.querySelector('#title').value;
        let dueDate = document.querySelector('#due-date').value;
        let category = document.querySelector('#category').value;
        let description = document.querySelector('#description').value;

        const todo = {
            "title": title,
            "date": dueDate,
            "category": category,
            "description:": description,
            "done": false,
            "createdAt": new Date().getTime()
        };

        console.log(todo);

        todos.push(todo);
        
        localStorage.setItem('todos', JSON.stringify(todos));

        listRefresher();

        todoForm.reset();

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
                    <span id="due-date">${item.date}</span>
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

    activateSelectListeners();
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
        SELECT TO DO ITEM
*/

function activateSelectListeners() {
    let item = document.querySelectorAll('.todo-content');
    item.forEach((item, i) => {
        item.addEventListener('click', () => {selectItem(i)})
    });
}
 
function selectItem(i) { 
    modalTitle.innerHTML = '';

    let title = document.querySelector('#title');
    title.value = todos[i].title;
    title.disabled = true;

    let dueDate = document.querySelector('#due-date');
    dueDate.value = todos[i].date;
    dueDate.disabled = true;

    let category = document.querySelector('#category');
    category.value = todos[i].category;
    category.disabled = true;

    let description = document.querySelector('#description');
    description.value = todos[i].description;
    description.disabled = true;

    addModal.classList.remove('hidden');
    modalCover.classList.remove('hidden');
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
        eb.addEventListener('click', () => {editItem(i)})
    })
}

function editItem() {

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
    const cancelBtn = document.querySelector('#cancel-btn');
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
        modalTitle.innerHTML = 'Add Item';
        addModal.classList.remove('hidden');
        modalCover.classList.remove('hidden');
    });
}



// const itemsArray = localStorage.getItem("items" ? JSON.parse(localStorage.getItem("items")) : []);

// function createItem(item){
//     itemsArray.push(item.value)
//     localStorage("")
// }




// /*
//         RENDER TO DO LIST
// */

// const todoList = document.querySelector('#todo-list');
// const addTodo = document.querySelector('#submit-btn');


// let todoItems = [];

// const complete = (i) => {
//     todoItems[i].isComplete = !todoItems[i].isComplete;
//     listfresher();
// }

// const listfresher = () => {
//     todoList.innerHTML = '';
//     renderTodos();
// }

// const renderTodos = () => {
//     for (i in todoItems)
//     {
//         let item = todoItems[i];
        
    //      let template = 
    //      `<div class="todo-item ${item.isComplete ? 'complete' : ''}">
    //      <span id="checkbox" onClick="complete(${i})">${item.isComplete ? '<i class="fa fa-check"></i>' : ''}</span>
        
    //      <div class="todo-content">
    //          <p>${item.title}</p>
    //          <div class="due-date">
    //              <i class="fa fa-clock"></i>
    //              <span id="due-date">${item.date}</span>
    //          </div>
    //          <div class="category">
    //              <i class="fa fa-user"></i>
    //              <span id="category">${item.category}</span>
    //          </div>
    //      </div>

    //      <div class="actions">
    //          <div class="edit"><i class="fa fa-pen"></i></div>
    //          <div class="delete"><i class="fa fa-trash"></i></div>
    //      </div>
    //  </div>`;

//     todoList.insertAdjacentHTML('beforeend', template);
//     }
// }

// /*
//         ADD TO DO ITEM
// */

// addTodo.addEventListener('click', function(event) {
//     event.preventDefault();

//     let title = document.querySelector('#title').value;
//     let dueDate = document.querySelector('#due-date').value;
//     let category = document.querySelector('#category').value;
//     let description = document.querySelector('#description').value;

//     let form = document.querySelector('#add-form');
    
//     let temp = {"title": title, "date": dueDate, "category": category, "description:": description, "isComplete": false};

//     todoItems.push(temp);

//     listfresher();
//     addModal.classList.add('hidden');
//     modalCover.classList.add('hidden');

//     form.reset();
// });

// const addToLocalStorage = async() => {
//     let localData = await localStorage.getItem('localTodoItems');

//     let data = JSON.parse(localData);

//     if (localData.length > 0) {
//         todoItems = data;
//     }

//     listfresher();
// }

// /*
//         DELETE TO DO ITEM
// */

// let deleteTodo = document.querySelectorAll('.delete');

// deleteTodo.forEach((db, i) => {
//     db.addEventListener('click', () => {
//         deleteItem(i)
//     });
// })

// function deleteItem(i){
//     localData
// }


// /*
//         LOCAL STORAGE
// */

// window.addEventListener('beforeunload', function(e) {
//     let data = JSON.stringify(todoItems);
//     localStorage.setItem('localTodoItems', data);
// })

// window.onload = () => {
//     displayDate();
// }