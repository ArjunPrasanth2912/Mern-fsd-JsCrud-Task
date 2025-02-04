# Mern-fsd-JsCrud-Task
Demonstrating a javascript crud operation through Income expense calculator.
tech stacks used - JS and CSS.
deployment - Netlify


🔄 Complete Workflow of the Income-Expense CRUD Task
🟢 Step 1: HTML (Structure)

    We create a form with inputs for description, amount, and type (income/expense).
    A table is used to display saved entries dynamically.
    Radio buttons allow filtering between "All," "Income," and "Expense."

🔵 Step 2: JavaScript (Functionality)
1️⃣ Page Loads → Get Saved Data from Local Storage

let entries;
if (localStorage.getItem("entries")) {
  entries = JSON.parse(localStorage.getItem("entries"));
} else {
  entries = [];
}

✔ This ensures previously saved data is loaded when the page refreshes.

2️⃣ User Adds a New Entry

    The form submission event is triggered when the "Add Entry" button is clicked:

form.addEventListener("submit", e => {
  e.preventDefault(); // Prevent page reload
  addEntry(descriptionInput.value, amountInput.value, typeInput.value); 
  form.reset(); // Clear form inputs after submission
});

✔ This sends the form values to addEntry().
3️⃣ addEntry() Stores Data and Updates UI

const addEntry = (description, amount, type) => {
  entries.push({ description, amount: parseFloat(amount), type }); 
  saveToLocalStorage(); // Save data persistently
  renderEntries(); // Update the table UI
};

✔ A new entry object ({description, amount, type}) is pushed into the entries array.
✔ Local storage is updated so the data remains after refreshing.
✔ The table is refreshed using renderEntries().
4️⃣ renderEntries() Dynamically Prints Data

const renderEntries = (filter = "all") => {
  entriesBody.innerHTML = ""; // Clear table before re-rendering

  let filteredEntries;
  if (filter === "all") {
    filteredEntries = entries;
  } else if (filter === "income") {
    filteredEntries = entries.filter(entry => entry.type === "income");
  } else if (filter === "expense") {
    filteredEntries = entries.filter(entry => entry.type === "expense");
  }

  filteredEntries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.description}</td>
      <td>${entry.amount}</td>
      <td>${entry.type}</td>
      <td>
        <button onclick="editEntry(${index})">Edit</button>
        <button onclick="deleteEntry(${index})">Delete</button>
      </td>
    `;
    entriesBody.appendChild(row);
  });

  updateTotals(); // Update balance
};

✔ Clears the table to prevent duplicates.
✔ Filters the data based on the selected filter ("all", "income", "expense").
✔ Creates a new <tr> row for each entry and appends it to the table.
✔ Updates the total income, expenses, and balance.
5️⃣ updateTotals() Recalculates Income, Expenses & Balance

const updateTotals = () => {
  const income = entries.filter(entry => entry.type === "income")
                        .reduce((sum, entry) => sum + entry.amount, 0);

  const expenses = entries.filter(entry => entry.type === "expense")
                          .reduce((sum, entry) => sum + entry.amount, 0);

  totalIncome.textContent = `₹${income}`;
  totalExpenses.textContent = `₹${expenses}`;
  netBalance.textContent = `₹${income - expenses}`;
};

✔ Filters entries to get total income and total expenses.
✔ Calculates net balance (Income - Expenses) and updates UI.
6️⃣ Filtering the Data When User Clicks a Radio Button

filters.forEach(filter => {
  filter.addEventListener("change", e => {
    renderEntries(e.target.value);
  });
});

✔ Detects when a radio button is clicked.
✔ Passes "all", "income", or "expense" to renderEntries().
✔ Only shows the selected type of entries.
7️⃣ Editing an Entry

const editEntry = index => {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  typeInput.value = entry.type;
  entries.splice(index, 1); // Remove the existing entry so the updated one replaces it
  saveToLocalStorage();
  renderEntries();
};

✔ Fills the form with existing entry data.
✔ Removes the old entry so that the edited entry replaces it.
✔ Saves and re-renders the table.
8️⃣ Deleting an Entry

const deleteEntry = index => {
  entries.splice(index, 1); // Remove entry from the array
  saveToLocalStorage();
  renderEntries();
};

✔ Removes the selected entry from entries.
✔ Saves the updated list to local storage.
✔ Updates the table instantly.
📌 Complete Workflow Summary
Step	What Happens?
1. Page Loads	Retrieve saved entries from local storage.
2. User Adds an Entry	Form submission triggers addEntry().
3. Entry is Saved	Data is stored in entries array & local storage.
4. Table is Updated	renderEntries() prints the data dynamically.
5. Totals are Updated	updateTotals() recalculates balance.
6. User Filters Entries	Radio button triggers renderEntries().
7. User Edits an Entry	Data is pre-filled in form and updated.
8. User Deletes an Entry	Entry is removed and UI is refreshed.
