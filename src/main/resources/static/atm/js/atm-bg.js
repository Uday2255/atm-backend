
document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector('.atm-bg')) {
        const bg = document.createElement('div');
        bg.className = 'atm-bg';
        document.body.appendChild(bg);
    }
});