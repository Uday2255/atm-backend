const accountNumber = sessionStorage.getItem("accountNumber");

if (!accountNumber) {
    alert("Session expired! Please login again.");
    window.location.href = "index.html";
}

document.getElementById("withdrawForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const msg = document.getElementById("msg");
    msg.innerHTML = "";

    if (isNaN(amount) || amount < 100) {
        msg.innerHTML = "<span style='color:#fca5a5; font-size:24px;'>Minimum withdrawal ₹100!</span>";
        return;
    }
    if (amount % 100 !== 0) {
        msg.innerHTML = "<span style='color:#fca5a5; font-size:24px;'>Amount must be multiple of ₹100!</span>";
        return;
    }

    fetch(`/api/withdraw/${accountNumber}/${amount}`, {
        method: "POST"
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(errorData => {  // This is the key fix!
                throw new Error(errorData.message || "Withdrawal failed");
            });
        }
        return res.json();
    })
    .then(user => {
        msg.innerHTML = `
            <div style='color:#86efac; font-size:26px; font-weight:bold; line-height:1.6;'>
                Withdrawal Successful!<br><br>
                ₹${amount.toFixed(2)} Dispensed<br>
                Remaining Balance: ₹${user.balance.toFixed(2)}
            </div>`;

        document.getElementById("amount").value = "";

        setTimeout(() => {
            window.location.href = "menu.html";
        }, 3000);
    })
    .catch(err => {
        const errorMsg = err.message.toLowerCase();

        if (errorMsg.includes("insufficient")) {
            msg.innerHTML = "<span style='color:#fca5a5; font-size:28px; font-weight:bold;'>Insufficient Balance!</span>";
        } else if (errorMsg.includes("multiple")) {
            msg.innerHTML = "<span style='color:#fca5a5; font-size:24px;'>Amount must be multiple of ₹100!</span>";
        } else if (errorMsg.includes("minimum")) {
            msg.innerHTML = "<span style='color:#fca5a5; font-size:24px;'>Minimum withdrawal ₹100!</span>";
        } else {
            msg.innerHTML = `<span style='color:#fca5a5; font-size:24px;'>Error: ${err.message}</span>`;
        }
    });
});