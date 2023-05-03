
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

addBtn.addEventListener('click', () => {
    addModal.classList.remove('hidden');
    modalCover.classList.remove('hidden');
});
