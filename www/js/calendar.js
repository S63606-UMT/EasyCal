
// calendar.js
// Get the grid container element
var gridContainer = document.getElementById('grid-container');
var grid = document.getElementById('calendar-grid');
// Create a 2D array to represent the calendar grid
var today = new Date();
var currentMonth = today.getMonth();
var calendarData = [];
var count = 0;

var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');

// Function to decrement the current month
prevButton.addEventListener('click', function() {
  today = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  document.getElementById('selected-month').textContent = today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
  updateCalendar();
});

// Function to increment the current month
nextButton.addEventListener('click', function() {
  today = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  document.getElementById('selected-month').textContent = today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
  updateCalendar();
});

// Onload
window.addEventListener('load', function() {
  today = new Date(today.getFullYear(), today.getMonth(), 1);
  document.getElementById('selected-month').textContent = today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
  updateCalendar();
});

// Update the calendar grid
function updateCalendar() {
  var currentMonth = today.getMonth();
  var calendarData = [];
  var count = 0;

  // Clear the grid
  grid.innerHTML = '';

  // Create a new 2D array for the updated calendar data
  for (var row = 0; row < 5; row++) {
    calendarData[row] = [];
    for (var col = 0; col < 7; col++) {
      count++;
      var date = new Date(today.getFullYear(), currentMonth, count);
      if (date.getMonth() > currentMonth) {
        break;
      } else {
        calendarData[row][col] = { date: date, selected: false };
      }
    }
  }

  // Create the grid cells
  for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 7; col++) {
      var cell = document.createElement('div');
      cell.className = 'cell';

      if (typeof calendarData[row][col].date == 'undefined') {
        break;
      }
      var date = calendarData[row][col].date;
      var day = date.getDate();
      cell.textContent = day.toString(); // Display only the day part of the date

      cell.addEventListener('click', function(event) {
        // Add event listener to open addEvent.html when the cell is clicked
        event.preventDefault();
        window.location.href = 'addEvent.html?date=' + date.toISOString().slice(0, 10); // Format the date for URL encoding

        // Update the JSON object
        var notes = localStorage.getItem('notes');
        if (notes) {
          notes = JSON.parse(notes);
        } else {
          notes = {};
        }
        notes[day] = ''; // Initialize the note for this date
        localStorage.setItem('notes', JSON.stringify(notes));
      });
      grid.appendChild(cell);
    }
  }
}
