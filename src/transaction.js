import { removeTransaction } from "./request.js";


const modal = document.querySelector('#modal-background');
const updateForm = document.querySelector('#form-update-transaction');

function createElement (tag, content, id, className) {
    const newElement = document.createElement(tag);
    newElement.textContent = content;
    if(id) {
        newElement.id = id;
    } 
    if(className) {
        newElement.classList.add(className);
    }
    return newElement;
}

function renderTransaction ({name, date, id, value}) {
    const newTr = document.createElement('tr');
    const transactionName = createElement('td', name,`name-${id}`);
    const dateTransaction = createElement('td', date);
    const valueTransaction = createElement('td', `R$${value}`, `value-${id}`);
    const actions = createElement('td', '', '', 'actions');
    const deleteBtn = createElement('button', 'Excluir', id, 'remove-btn');
    deleteBtn.addEventListener('click', removeTransaction);

    const updateBtn = createElement('button', 'Atualizar', '', id);
    updateBtn.addEventListener('click', eve => {
        updateForm.classList.add(id)
        modal.style.display = 'flex';
    });
    updateBtn.classList.add('update-btn');

    actions.append(deleteBtn, updateBtn);
    newTr.append(transactionName, dateTransaction, valueTransaction, actions);
    document.querySelector('table').append(newTr);
}

function updateTable ({name, value, id}){
    const nameUpdate = document.querySelector(`#name-${id}`);
    nameUpdate.textContent = name;

    const valueUpdate = document.querySelector(`#value-${id}`);
    valueUpdate.textContent = `R$${value}`
}

export{renderTransaction, updateTable}