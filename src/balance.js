export default async function calculateBalance () {
    const response = await fetch(" http://localhost:3000/transactions");
    const transactions = await response.json()
    const balance = transactions.reduce((accumulate, {value}) => {
        return accumulate + Number(value);
    }, 0)

    const balanceText = document.querySelector('#balance');
    if(transactions.length !== 0){
        balanceText.textContent = `R$${balance}`;
    } else {
        balanceText.textContent = `R$00.00`;
    }

}