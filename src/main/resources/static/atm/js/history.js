const accountNumber = sessionStorage.getItem("accountNumber");

const historyList = document.getElementById("historyList");

fetch(`http://localhost:8080/api/history/${accountNumber}`)
    .then(res => res.json())
    .then(transactions => {
        historyList.innerHTML = "";

        if (transactions.length === 0) {
            historyList.innerHTML = "<li>No transactions found.</li>";
            return;
        }

        transactions.forEach(txn => {
            const li = document.createElement("li");
            li.innerHTML = `
                <p><strong>Type:</strong> ${txn.type}</p>
                <p><strong>Amount:</strong> ₹${txn.amount.toFixed(2)}</p>
                <p><strong>Date:</strong> ${new Date(txn.dateTime).toLocaleString()}</p>
            `;
            historyList.appendChild(li);
        });
    })
    .catch(err => {
        console.error(err);
        historyList.innerHTML = "<li>Error loading transactions.</li>";
    });
