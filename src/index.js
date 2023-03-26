import { fetchTransactions, postTransaction, updateTransaction } from "./request.js";


document.addEventListener('DOMContentLoaded', () => fetchTransactions());

const newTransactionForm = document.querySelector('#add-transaction-form');
newTransactionForm.addEventListener('submit', postTransaction)

const updateForm = document.querySelector('#form-update-transaction');
updateForm.addEventListener('submit', updateTransaction)

