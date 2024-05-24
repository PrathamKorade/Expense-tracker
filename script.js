
let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const commentInput = document.getElementById('comment-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

//chart 
const expenseChartCanvas = document.getElementById('expense-chart');
let expenseChart;


function addExpenseToTable(expense) {
    const newRow = expensesTableBody.insertRow(0);

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const commentCell = newRow.insertCell();
    const createdAtCell = newRow.insertCell();
    const updatedAtCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const editCell = newRow.insertCell();
    
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);


        updateChart();

    });

    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function () {
        categorySelect.value = expense.category;
        amountInput.value = expense.amount;
        commentInput.value = expense.comment;
        
        addBtn.textContent = 'Update';
        addBtn.removeEventListener('click', addExpenseHandler);
        addBtn.addEventListener('click', function updateHandler() {
            if (!validateInputs()) return;

            expense.category = categorySelect.value;
            expense.amount = Number(amountInput.value);
            expense.comment = commentInput.value;
            expense.updatedAt = new Date().toLocaleString();
            categoryCell.textContent = expense.category;
            amountCell.textContent = expense.amount;
            commentCell.textContent = expense.comment;
            updatedAtCell.textContent = expense.updatedAt;

            totalAmount = expenses.reduce((total, exp) => total + exp.amount, 0);
            totalAmountCell.textContent = totalAmount;

            resetInputs();
            addBtn.textContent = 'Add';
            addBtn.removeEventListener('click', updateHandler);
            addBtn.addEventListener('click', addExpenseHandler);


            updateChart();

        });
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    commentCell.textContent = expense.comment;
    createdAtCell.textContent = expense.createdAt;
    updatedAtCell.textContent = expense.updatedAt;
    deleteCell.appendChild(deleteBtn);
    editCell.appendChild(editBtn);
}

function addExpenseHandler() {
    if (!validateInputs()) return;

    const expense = {
        category: categorySelect.value,
        amount: Number(amountInput.value),
        comment:commentInput.value,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
    };

    expenses.push(expense);
    addExpenseToTable(expense);

    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    resetInputs();
    updateChart();
}

function validateInputs() {
    if (categorySelect.value === '') {
        alert('Please select a category');
        return false;
    }
    if (isNaN(amountInput.value) || amountInput.value <= 0) {
        alert('Please enter a valid amount');
        return false;
    }
  
    return true;
}

function resetInputs() {
    categorySelect.value = '';
    amountInput.value = '';

    commentInput.value ='';
}

addBtn.addEventListener('click', addExpenseHandler);



function updateChart() {
    const expenseCategories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(expenseCategories),
        datasets: [{
            data: Object.values(expenseCategories),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(expenseChartCanvas, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}
