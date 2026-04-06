document.getElementById('save-discipline').onclick = function() {
    const btn = this;
    const msg = document.getElementById('save-msg');
    
    // Agar date select nahi ki to aaj ki date khud utha le
    let dateVal = document.getElementById('disc-date').value;
    if(!dateVal) {
        dateVal = new Date().toLocaleDateString();
    }

    // Data collect karna (HTML IDs ke mutabiq)
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

    // Google Sheets ko data bhejna
    fetch('APNA_WEB_APP_URL_YAHAN_DALEIN', {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(() => {
        // Success message
        btn.innerText = "SAVE DISCIPLINE";
        btn.disabled = false;
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 3000);
        
        // Form reset (Optional)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
    }).catch(err => {
        alert("Connection Error!");
        btn.disabled = false;
        btn.innerText = "SAVE DISCIPLINE";
    });
};
