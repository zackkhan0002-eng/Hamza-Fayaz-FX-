const fields = [
  "chk-cme","chk-equity","chk-london","chk-nyam","chk-nypm",
  "chk-tp","chk-sl","chk-rules","chk-execution"
];

const saveBtn = document.getElementById('save-discipline');
const msgBox = document.getElementById('save-msg');
const dateInput = document.getElementById('disc-date');

// **PASTE YOUR GOOGLE APPS SCRIPT URL HERE**
const scriptURL = "PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE";

saveBtn.addEventListener('click', async () => {
  const date = dateInput.value;
  if (!date) { alert("Please select a date!"); return; }

  const data = {};
  fields.forEach(f => { data[f] = document.getElementById(f).checked; });

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({date, fields: data}),
      headers: {"Content-Type": "application/json"}
    });
    const result = await res.json();

    if (result.status === "success") {
      msgBox.classList.remove('hidden');
      setTimeout(()=> msgBox.classList.add('hidden'), 3000);
      localStorage.setItem("discipline_" + date, JSON.stringify(data));
    } else {
      alert("Error saving: " + result.message);
    }
  } catch(err) {
    alert("Error: " + err.message);
  }
});

dateInput.addEventListener('change', () => {
  const date = dateInput.value;
  if (!date) return;

  const saved = localStorage.getItem("discipline_" + date);
  if (saved) {
    const data = JSON.parse(saved);
    fields.forEach(f => { document.getElementById(f).checked = data[f] || false; });
  } else {
    fields.forEach(f => document.getElementById(f).checked = false);
  }
});
