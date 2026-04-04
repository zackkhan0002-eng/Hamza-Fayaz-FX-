const fields = [
"chk-cme","chk-equity","chk-london","chk-nyam","chk-nypm",
"chk-tp","chk-sl","chk-rules","chk-execution"
];

const saveBtn = document.getElementById("save-discipline");
const msgBox = document.getElementById("save-msg");
const dateInput = document.getElementById("disc-date");

// Google Apps Script URL for Gmail saving
const scriptURL = "PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE";

saveBtn.addEventListener("click", function(){
    const date = dateInput.value;
    if(!date){ alert("Please select a date"); return; }

    let data = {date:date};
    fields.forEach(id=>{
        data[id] = document.getElementById(id).checked;
    });

    fetch(scriptURL,{
        method:"POST",
        mode:"no-cors",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    })
    .then(()=>{
        msgBox.classList.remove("hidden");
        setTimeout(()=>{ msgBox.classList.add("hidden"); }, 3000);
    })
    .catch(()=>{
        alert("Save failed");
    });
});
