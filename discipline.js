document.getElementById('save-discipline').onclick = function() {
    const btn = this;
    const msg = document.getElementById('save-msg');
    
    // Date select nahi ki to aaj ki date uthayega
    let dateVal = document.getElementById('disc-date').value;
    if(!dateVal) {
        dateVal = new Date().toLocaleDateString();
    }

    // Data collect karna
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

    // Aapka Latest Web App URL yahan update kar diya hai
    fetch('https://script.google.com/macros/s/AKfycbwi8npRFpmd_zE8-_ZH-yY1wnohxLqUS901xqLYJDKORpfYHOLu4i2fiZkbOtJy7d1aJw/exec', {
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
        
        // Checkboxes reset
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
    }).catch(err => {
        alert("Connection Error! Check internet.");
        btn.disabled = false;
        btn.innerText = "SAVE DISCIPLINE";
    });
};
    
