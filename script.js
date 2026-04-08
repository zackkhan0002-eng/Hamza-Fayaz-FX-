// --- PAGE REVEAL ANIMATION ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) reveals[i].classList.add("active");
    }
}
window.addEventListener("scroll", reveal);

// --- TIME & DATE UPDATE ---
function updateTime() {  
    const now = new Date();  
    document.getElementById('watch-time').innerText = now.toLocaleTimeString('en-US', { hour12: true, hour:'2-digit', minute:'2-digit', second:'2-digit' });  
    document.getElementById('watch-date').innerText = now.toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });  
    document.getElementById('hub-date-display').innerText = now.toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });  
}  
setInterval(updateTime, 1000); 
updateTime();  

// --- ANALOG CLOCKS LOGIC ---
function createClock(id){
    const canvas = document.getElementById(id); 
    const ctx = canvas.getContext("2d"); 
    const radius = canvas.height/2; 
    ctx.translate(radius,radius);
    
    function draw(){
        ctx.clearRect(-radius,-radius,canvas.width,canvas.height);
        const now=new Date(); let h=now.getHours()%12; let m=now.getMinutes(); let s=now.getSeconds();
        ctx.font = "bold 12px Arial"; ctx.fillStyle = "#ffd700"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("12", 0, -radius+15); ctx.fillText("6", 0, radius-15);
        h=(h*Math.PI/6)+(m*Math.PI/(6*60)); drawHand(ctx, h, radius*0.5, 5, "#ffd700");
        m=(m*Math.PI/30); drawHand(ctx, m, radius*0.75, 3, "#ffffff");
        s=(s*Math.PI/30); drawHand(ctx, s, radius*0.85, 1, "#ff4444");
    }
    
    function drawHand(ctx, pos, length, width, color){
        ctx.beginPath(); ctx.lineWidth=width; ctx.lineCap="round"; ctx.moveTo(0,0); ctx.rotate(pos); ctx.lineTo(0,-length); ctx.strokeStyle=color; ctx.stroke(); ctx.rotate(-pos);
    }
    setInterval(draw, 1000); 
    draw();
}

createClock("asiaClock"); 
createClock("londonClock"); 
createClock("nyamClock"); 
createClock("nypmClock");

// --- SESSION HIGHLIGHTING ---
function highlightSession(){
    const hour = new Date().getHours();
    document.querySelectorAll(".session-card").forEach(box => box.classList.remove("active"));
    if(hour >= 18 || hour < 0) document.getElementById("asiaBox").classList.add("active");
    else if(hour >= 0 && hour < 6) document.getElementById("londonBox").classList.add("active");
    else if(hour >= 6 && hour < 12) document.getElementById("nyamBox").classList.add("active");
    else document.getElementById("nypmBox").classList.add("active");
}
setInterval(highlightSession, 60000); 
highlightSession();
  
// --- AUTHENTICATION SYSTEM ---
function unlockHub() {  
    const u = document.getElementById('h-u').value; 
    const p = document.getElementById('h-p').value;  
    if(u === "Hamzafayazfx" && p === "H@mza443322") {  
        localStorage.setItem('hde_auth', 'true'); 
        localStorage.setItem('hde_login_time', new Date().getTime());
        showHub(); 
        setTimeout(logout, 300000); 
    } else { 
        document.getElementById('login-msg').style.display = 'block'; 
    }  
}  

function showHub() {
    const hubOverlay = document.getElementById('hub-lock-overlay');
    const hubContent = document.getElementById('hub-content');
    if(hubOverlay) hubOverlay.style.display='none'; 
    if(hubContent) {
        hubContent.classList.remove('locked-content');  
        hubContent.style.setProperty('filter', 'none', 'important');
        hubContent.style.setProperty('opacity', '1', 'important');
        hubContent.style.setProperty('pointer-events', 'auto', 'important');
    }
}

function logout() { 
    localStorage.removeItem('hde_auth'); 
    localStorage.removeItem('hde_login_time'); 
    location.reload(); 
}
  
// --- GOOGLE SHEETS DISCIPLINE LOG ---
document.getElementById('save-discipline').onclick = function() {  
    const btn = this; 
    const msg = document.getElementById('save-msg');  
    
    let dateInput = document.getElementById('disc-date');
    let dateVal = dateInput ? dateInput.value : null;
    if(!dateVal) { dateVal = new Date().toLocaleDateString('en-GB'); }

    const data = { 
        date: dateVal, 
        cme: document.getElementById('chk-cme').checked ? "YES" : "NO", 
        equity: document.getElementById('chk-equity').checked ? "YES" : "NO", 
        london: document.getElementById('chk-london').checked ? "YES" : "NO", 
        nyam: document.getElementById('chk-nyam').checked ? "YES" : "NO", 
        nypm: document.getElementById('chk-nypm').checked ? "YES" : "NO", 
        tp: document.getElementById('chk-tp').checked ? "YES" : "NO", 
        sl: document.getElementById('chk-sl').checked ? "YES" : "NO", 
        rules: document.getElementById('chk-rules').checked ? "YES" : "NO", 
        execution: document.getElementById('chk-execution').checked ? "YES" : "NO" 
    };  

    btn.innerText = "SAVING TO VAULT..."; 
    btn.disabled = true;  

    const webAppUrl = 'https://script.google.com/macros/s/AKfycbzJq8SpxfzDpqgXIkz068S_WHwGiyQlPDBQKjAEFc_eeTNsCkMEI0tUizD4avD3V_F6/exec';  

    fetch(webAppUrl, { 
        method: 'POST', 
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data) 
    }).then(() => { 
        btn.innerText = "SAVE LOG"; 
        btn.disabled = false; 
        if(msg) {
            msg.classList.remove('hidden'); 
            msg.style.display = "block";
            setTimeout(() => {
                msg.classList.add('hidden');
                msg.style.display = "none";
            }, 4000); 
        }
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false); 
    }).catch(err => { 
        console.error("Error:", err);
        alert("Connection Error!"); 
        btn.disabled = false; 
        btn.innerText = "SAVE LOG"; 
    });  
};  

// --- PERSISTENT LOGIN ON LOAD ---
window.addEventListener('load', () => {  
    reveal();
    const isAuth = localStorage.getItem('hde_auth'); 
    const loginTime = localStorage.getItem('hde_login_time');
    if(isAuth === 'true' && (new Date().getTime() - loginTime < 300000)) {  
        showHub(); 
        setTimeout(logout, 300000 - (new Date().getTime() - loginTime));
    }  
});
        
