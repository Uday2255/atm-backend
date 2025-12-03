
const accNumber = sessionStorage.getItem("accountNumber");
const userName = sessionStorage.getItem("name");

if (!accNumber || !userName) {
    alert("Access Denied! Please login first.");
    window.location.href = "login.html";
    throw new Error("User not logged in");
}

document.getElementById("name").innerText = userName;
document.getElementById("accountNumber").innerText = accNumber;

fetch(`/api/balance/${accNumber}?t=${Date.now()}`)
    .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
    })
    .then(user => {
        document.getElementById("balance").innerText = Number(user.balance).toFixed(2);
    })
    .catch(err => {
        console.error("Balance fetch error:", err);
        document.getElementById("balance").innerText = "Error";
        alert("Failed to load balance. Please try again.");
    });