document.getElementById('save-discipline').onclick = function() {
    const btn = this;
    const msg = document.getElementById('save-msg');
    
    // Date pick karna (agar empty ho toh aaj ki date)
    let dateVal = document.getElementById('disc-date').value;
    if(!dateVal) {
        dateVal = new Date().toLocaleDateString('en-GB'); 
    }

    // Saara data checkboxes se collect karna
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

    // Button state change
    btn.innerText = "SAVING TO VAULT...";
    btn.disabled = true;

    // Aapka Latest Web App Link
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbwPuw8Scn4XIpCuOL7gTo9llyed5_qFEIdJLJrM53h3Uzbz2S_xgifA__9yMZpAEmko/exec';

    fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(() => {
        // Success: Button aur Message update
        btn.innerText = "SAVE DISCIPLINE";
        btn.disabled = false;
        
        if(msg) {
            msg.classList.remove('hidden');
            msg.style.display = "block";
            setTimeout(() => {
                msg.classList.add('hidden');
                msg.style.display = "none";
            }, 4000);
        }
        
        // Form reset (Checkboxes khali karna)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
        
        console.log("Data sent to Google Sheet successfully.");
    }).catch(err => {
        console.error("Error:", err);
        alert("Connection Error! Please check your internet.");
        btn.disabled = false;
        btn.innerText = "SAVE DISCIPLINE";
    });
};
