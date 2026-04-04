function doPost(e){
  var data = JSON.parse(e.postData.contents);
  var date = data.date;
  var body = "Trading Discipline for " + date + ":\n\n";
  delete data.date;
  for(var k in data){ body += k + " : " + data[k] + "\n"; }
  MailApp.sendEmail("hamxafeyax@yahoo.com", "Discipline - " + date, body);
  return ContentService.createTextOutput("success");
}
