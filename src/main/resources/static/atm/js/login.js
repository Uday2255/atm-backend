// js/login.js → FINAL 100% WORKING + SHOWS ERROR ON WRONG LOGIN

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const accountNumber = document.getElementById("accountNumber").value.trim();
    const pin = document.getElementById("pin").value;
    const msg = document.getElementById("msg");

    // Clear previous message
    msg.innerHTML = "";

    // Basic format check
    if (!accountNumber || !pin || accountNumber.length < 8 || pin.length !== 4) {
        msg.innerHTML = "<span style='color:#fca5a5; font-size:22px; font-weight:bold;'>Invalid Account Number or PIN format!</span>";
        return;
    }

    fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber, pin })
    })
    .then(res => {
        if (!res.ok) {
            // Wrong credentials → backend returns 400/401 → catch here
            throw new Error("Invalid Account Number or PIN");
        }
        return res.json();
    })
    .then(user => {
        // SUCCESS
        sessionStorage.setItem("accountNumber", user.accountNumber);
        sessionStorage.setItem("name", user.name);

        msg.innerHTML = "<span style='color:#86efac; font-size:22px;'>Login Successful!</span>";
        
        setTimeout(() => {
            window.location.href = "menu.html";
0        }, 1200);
    })
    .catch(err => {
        // THIS SHOWS THE RED ERROR WHEN WRONG PIN OR ACCOUNT NUMBER
        msg.innerHTML = "<span style='color:#fca5a5; font-size:24px; font-weight:bold;'>Invalid Account Number or PIN!</span>";
    });
});