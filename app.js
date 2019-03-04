'use strict';

// Global variables

var timeHours = ['6am','7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var storeForm = document.getElementById('storeForm');
var allBranches = [];
var tableContent = document.getElementById('storeTable');

// Event listener form, on submit/event. retreves form data and uses constructor function.

storeForm.addEventListener('submit', handleFormSubmit);

// constructor function

function SalmonStore (name, minCustomers, maxCustomers, avgCookies) {
  this.timeHours = timeHours;
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.totalCookiesSoldToday = [];
  this.addedTotalCookies = 0;
  this.customersEachHour = [];
  allBranches.push(this);
  this.peopleEveryHour();
  this.totalSold();
}

// Random generator for people showing up every hour

SalmonStore.prototype.peopleEveryHour = function() {
  for (var i = 0; i < timeHours.length; i++) {
    var customerForOneHour =  Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)+ this.minCustomers);
    this.customersEachHour.push(customerForOneHour);
  }
},

// function for total cookies sold for whole day

SalmonStore.prototype.totalSold = function() {
  for (var i = 0; i < timeHours.length; i++) {
    var totalCookiesSold = this.customersEachHour[i] * this.avgCookies;
    this.totalCookiesSoldToday.push(Math.floor(totalCookiesSold));
    this.addedTotalCookies = this.totalCookiesSoldToday[i] + this.addedTotalCookies;
  }
},

// generator for numbers going in table, minus the header & footer row

SalmonStore.prototype.putTheNumbersInTheBroswer = function() {
  var trEL = document.createElement('tr');
  tdEL = document.createElement('td');
  tdEL.textContent = this.name;
  trEL.appendChild(tdEL);
  for (var i = 0; i < timeHours.length; i++) {
    var tdEL = document.createElement('td');
    tdEL.textContent = this.totalCookiesSoldToday[i];
    trEL.appendChild(tdEL);
  }
  tableContent.appendChild(trEL);
  tdEL = document.createElement('td');
  tdEL.textContent = this.addedTotalCookies;
  trEL.appendChild(tdEL);
};

// event form for adding/ updating new branch

function handleFormSubmit(event){
  event.preventDefault();
  var avgCookies = parseFloat(event.target.avgCookies.value);
  var minCustomers = parseInt(event.target.minCustomers.value);
  var maxCustomers = parseInt(event.target.maxCustomers.value);
  var name = event.target.name.value;
  new SalmonStore(name, minCustomers, maxCustomers, avgCookies);
  event.target.reset();
  renderTable();
}

// footer row for all totals, including total of totals

function footerRow() {
  var trEl = document.createElement('tr');
  var total = document.createElement('td');
  total.textContent = 'Total';
  trEl.appendChild(total);
  var totalOfTotals = 0;
  for (var i = 0; i < timeHours.length; i++) {
    var totalPerHour = document.createElement('td');
    var startingCookies = 0;
    for (var j = 0; j < allBranches.length; j++) {
      startingCookies += allBranches[j].totalCookiesSoldToday[i];
      totalOfTotals += allBranches[j].totalCookiesSoldToday[i];
    }
    totalPerHour.textContent = startingCookies;
    trEl.appendChild(totalPerHour);
  }
  var totalElement = document.createElement('td');
  totalElement.textContent = totalOfTotals;
  trEl.appendChild(totalElement);
  tableContent.appendChild(trEl);
}

// header row, includes time of day when open, blank cell, and header for total coloumn

function headerRow () {
  var total = document.createElement('th');
  var blankData = document.createElement('th');
  var trEL = document.createElement('tr');
  trEL.appendChild(blankData);
  for (var i = 0; i < timeHours.length; i++) {
    var thEL = document.createElement('th');
    thEL.textContent = timeHours[i];
    trEL.appendChild(thEL);
  }
  total.textContent = 'Total';
  trEL.appendChild(total);
  tableContent.appendChild(trEL);
}

// Core 5 branches that are always there when refreashed

new SalmonStore('1st and Pike', 23, 65, 6.3);
new SalmonStore('SeaTac Airport', 3, 24, 1.2);
new SalmonStore('SeattleCenter', 11, 38, 3.7);
new SalmonStore('Capital Hill', 20, 38, 2.3);
new SalmonStore('Alki', 2, 16, 4.6);

// deletes whole table then remakes table

function renderTable() {
  tableContent.innerHTML= '';
  headerRow();
  for (var i = 0; i < allBranches.length; i++) {
    allBranches[i].putTheNumbersInTheBroswer();
  }
  footerRow();
}
renderTable();