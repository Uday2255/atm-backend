// js/deposit.js → FINAL VERSION (WORKS WITH 100/200/500 NOTES + MIN ₹500)

const accountNumber = sessionStorage.getItem("accountNumber");

// Redirect if not logged in
if (!accountNumber) {
    alert("Please login first!");
    window.location.href = "index.html";
}

// Auto update total when user types in any note field
document.querySelectorAll('.note-input').forEach(input => {
    input.addEventListener('input', updateTotal);
});

function updateTotal() {
    const n100 = parseInt(document.getElementById("note100").value) || 0;
    const n200 = parseInt(document.getElementById("note200").value) || 0;
    const n500 = parseInt(document.getElementById("note500").value) || 0;

    const total = (n100 * 100) + (n200 * 200) + (n500 * 500);
    document.getElementById("totalBox").innerText = `Total: ₹${total}`;
}

// Main deposit function
function depositCash() {
    const n100 = parseInt(document.getElementById("note100").value) || 0;
    const n200 = parseInt(document.getElementById("note200").value) || 0;
    const n500 = parseInt(document.getElementById("note500").value) || 0;
    const total = (n100 * 100) + (n200 * 200) + (n500 * 500);

    const msg = document.getElementById("msg");

    // Validation
    if (total === 0) {
        msg.innerHTML = "<span style='color:#fca5a5; font-size:22px;'>Please insert some notes!</span>";
        return;
    }
    if (total < 500) {
        msg.innerHTML = "<span style='color:#fca5a5; font-size:24px;'>Minimum deposit ₹500!</span>";
        return;
    }

    // Send to backend
    fetch(`/api/deposit/${accountNumber}/${total}`, {
        method: "POST"
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
    })
    .then(data => {
        msg.innerHTML = `
            <span style='color:#86efac; font-size:24px;'>
                ₹${total} Deposited Successfully!<br>
                <strong>New Balance: ₹${data.balance.toFixed(2)}</strong>
            </span>`;
        
        // Reset all fields
        document.getElementById("note100").value = "0";
        document.getElementById("note200").value = "0";
        document.getElementById("note500").value = "0";
        updateTotal();

        // Redirect after 3 seconds
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 3000);
    })
    .catch(err => {
        msg.innerHTML = `<span style='color:#fca5a5; font-size:22px;'>${err.message}</span>`;
    });
}

// Initialize total on page load
updateTotal();