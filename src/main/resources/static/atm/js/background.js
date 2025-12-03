document.addEventListener("DOMContentLoaded",()=>{  
    const bg=document.createElement("div");bg.className="dots-bg";document.body.appendChild(bg);
    for(let i=0;i<50;i++){
        const d=document.createElement("div");d.className="dot";
        d.style.left=Math.random()*100+"%";
        d.style.top="-10px";
        d.style.animationDelay=Math.random()*10+"s";
        d.style.animationDuration=8+Math.random()*12+"s";
        bg.appendChild(d);
    }
});