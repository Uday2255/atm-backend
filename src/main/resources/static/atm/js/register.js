// js/register.js → FINAL WITH PHONE NUMBER (INDIAN ONLY + UNIQUE)

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pin = document.getElementById("pin").value;
    const initialBalance = parseFloat(document.getElementById("balance").value);
    const msg = document.getElementById("msg");

    // Validation
    if (!name) {
        msg.innerHTML = "<span style='color:#fca5a5;'>Name is required!</span>";
        return;
    }

    // Indian phone number validation (10 digits, starts with 6-9)
    if (!/^[6-9]\d{9}$/.test(phone)) {
        msg.innerHTML = "<span style='color:#fca5a5;'>Invalid phone number! Must be 10 digits & start with 6-9</span>";
        return;
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
        msg.innerHTML = "<span style='color:#fca5a5;'>PIN must be exactly 4 digits!</span>";
        return;
    }

    if (isNaN(initialBalance) || initialBalance < 1000 || initialBalance > 10000) {
        msg.innerHTML = "<span style='color:#fca5a5;'>Initial deposit must be ₹1000 - ₹10000!</span>";
        return;
    }

    fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, pin, balance: initialBalance })
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
    })
    .then(data => {
        sessionStorage.setItem("accountNumber", data.accountNumber);
        sessionStorage.setItem("name", data.name);

        document.getElementById("usernameDisplay").innerText = data.name;
        document.getElementById("accountNumberDisplay").innerText = data.accountNumber;
        document.getElementById("account-box").style.display = "block";

        msg.innerHTML = "<span style='color:#86efac; font-size:22px;'>Registration Successful!</span>";

        // Clear all fields
        document.getElementById("registerForm").reset();

        // Countdown
        let seconds = 5;
        const countdownEl = document.getElementById("countdown");
        const timer = setInterval(() => {
            seconds--;
            countdownEl.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(timer);
                window.location.href = "index.html";
            }
        }, 10000);
    })
    .catch(err => {
        const error = err.message.toLowerCase();
        if (error.includes("phone")) {
            msg.innerHTML = "<span style='color:#fca5a5;'>This phone number is already registered!</span>";
        } else {
            msg.innerHTML = "<span style='color:#fca5a5;'>Registration failed! Try again.</span>";
        }
    });
});