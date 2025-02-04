const form = document.getElementById("myForm");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const typeInput = document.getElementById("type");
const dataBody = document.getElementById("data-body"); // Ensure correct id in HTML
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expenses");
const netBalance = document.getElementById("net-balance");
const filter = document.querySelectorAll("input[name='filter']");

// Retrieving and storing data in local storage
let entries;

if (localStorage.getItem("entries")) {
    entries = JSON.parse(localStorage.getItem("entries"));
} else {
    entries = [];
}


// Handling the form submission
form.addEventListener("submit", e => {
    e.preventDefault();
    addEntry(description.value, amount.value, typeInput.value);
    form.reset();
});

const addEntry = (description, amount, type) => {
    entries.push({ description, amount: parseFloat(amount), type });
    saveToLocalStorage(); // Saving the updated entries to local storage
    renderEntries(); // Updating the table
    updateTotals();
};

// Saving the data to localStorage
const saveToLocalStorage = () => {
    localStorage.setItem("entries", JSON.stringify(entries));
};

const updateTotals=()=>{
    let income = 0;
    let expense = 0;

    entries.forEach(entry=>{
        if(entry.type==="income"){
            income += entry.amount;
        }else if(entry.type==="expense"){
            expense += entry.amount;
        }
        });
    
        totalIncome.textContent=`${income}`;
        totalExpense.textContent=`${expense}`;
        netBalance.textContent=`${income - expense}`;

};

//Delete Entry

const deleteEntry=(index)=>{
    entries.splice(index,1);//removing the entry
    saveToLocalStorage();
    renderEntries();


};

//Editing an Entry

const editEntry=(index)=>{

    const entry=entries[index];

    description.value=entry.description;
    amount.value=entry.amount;
    typeInput.value=entry.type;

    entries.splice(index,1);

    saveToLocalStorage();
    renderEntries();
};

// Rendering entries and updating the table
const renderEntries = (filter = "all") => {
    dataBody.innerHTML = ""; // Clear previous table rows

    const filteredEntries = filter === "all" ? entries : entries.filter(entry => entry.type === filter);

    filteredEntries.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.description}</td>
            <td>${entry.amount}</td>
            <td>${entry.type}</td>
            <td>
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>
            </td>`;
        dataBody.appendChild(row);
    });
    updateTotals();
};

//filters

document.querySelector(".filters").addEventListener("change", (e) => {   //passing the pressed filter radio button to the render entries
    renderEntries(e.target.value);
});

//resetting the form fields
document.getElementById("btn-del").addEventListener("click",()=>{
    document.getElementById("myForm").reset();
});



// Call renderEntries() when the page loads to display stored entries
renderEntries();
