import calculateBalance from "./balance.js";
import { renderTransaction, updateTable } from "./transaction.js";


const modal = document.querySelector('#modal-background');
const updateForm = document.querySelector('#form-update-transaction');

async function fetchTransactions () {
    const response = await fetch(" http://localhost:3000/transactions");
    const transactions = await response.json()
    transactions.forEach(renderTransaction);
    calculateBalance(transactions);
}


async function postTransaction (eve) {
    eve.preventDefault();
    const dataTransaction = {
        name: document.querySelector('#name').value,
        value: document.querySelector('#value').value,
        date: `-`
    }
    console.log(dataTransaction);
    const response = await fetch(" http://localhost:3000/transactions", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataTransaction)
    })
    const savedTransaction = await response.json();
    renderTransaction(savedTransaction);
    calculateBalance();
}

async function removeTransaction (eve) {
    const transaction = eve.currentTarget;
    const response = await fetch(`http://localhost:3000/transactions/${transaction.id}`, {
        method: 'DELETE'
    });
    transaction.parentNode.parentNode.remove();
    calculateBalance();
}


async function updateTransaction(eve){
    eve.preventDefault();

    const nameUpdate = document.querySelector('#name-update');
    const valueUpdate = document.querySelector('#value-update');
    const dataTransactionUpdate = {
        name: nameUpdate.value,
        value: valueUpdate.value,
        date: `-`
    }
    const response = await fetch( `http://localhost:3000/transactions/${updateForm.className}`, {
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataTransactionUpdate)
    })

    nameUpdate.value = '';
    valueUpdate.value = '';
    const updatedTransaction = await response.json();
    updateTable(updatedTransaction);
    updateForm.classList.remove(updatedTransaction.id);
    modal.style.display = 'none';
    calculateBalance();
}

export{fetchTransactions, postTransaction, removeTransaction, updateTransaction}