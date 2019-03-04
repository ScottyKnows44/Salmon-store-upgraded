`use strict`;

let entries = [];

let dateInput = document.getElementById('input');
let entryInput = document.getElementById('inputs');
const button = document.getElementById('new');
const journals = document.getElementById('journal'); 

function entry(data) {
  this.date = data.date;
  this.description = data.description
}

function createDateEntry() {
  button.addEventListener('click', addDate);
  function addDate(event) {
    event.preventDefault(); 
  let message = input.value 
  console.log(message)
    entries.push(message)
  }
}

function createJournalEntry() {
  button.addEventListener('click', addJournal);
  function addJournal(event) {
    event.preventDefault();
    let message2 = inputs.value 
    console.log(message2);
    entries.push(message2)
  }

}

createDateEntry();
createJournalEntry();

if(entries.length<0) {
  Handlebars.complie(entries);
}