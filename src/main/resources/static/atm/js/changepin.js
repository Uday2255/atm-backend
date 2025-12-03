// js/changepin.js → FINAL 100% WORKING WITH YOUR SPRING BOOT

const accountNumber = sessionStorage.getItem("accountNumber");

if (!accountNumber) {
    alert("Session expired! Please login again.");
    location.href = "login.html";
}

document.getElementById("changePinForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const oldPin = document.getElementById("oldPin").value;
    const newPin = document.getElementById("newPin").value;
    const confirmPin = document.getElementById("confirmPin").value;
    const msg = document.getElementById("msg");

    msg.innerHTML = "";

    if (newPin !== confirmPin) {
        msg.innerHTML = "<span style='color:#fca5a5; font-size:22px;'>New PIN and Confirm PIN do not match!</span>";
        return;
    }
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
        msg.innerHTML = "<span style='color:#fca5a5; font-size:22px;'>PIN must be exactly 4 digits!</span>";
        return;
    }


    fetch(`/api/changepin/${accountNumber}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPin: oldPin, newPin: newPin })
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
    })
    .then(data => {
        msg.innerHTML = "<span style='color:#86efac; font-size:24px;'>PIN Changed Successfully!</span>";
        document.getElementById("changePinForm").reset();
        
        setTimeout(() => {
            location.href = "menu.html";
        }, 2000);
    })
    .catch(err => {
        const error = err.message;
        if (error.includes("incorrect") || error.includes("PIN")) {
            msg.innerHTML = "<span style='color:#fca5a5; font-size:22px;'>Current PIN is incorrect!</span>";
        } else {
            msg.innerHTML = `<span style='color:#fca5a5;'>${error}</span>`;
        }
    });
});