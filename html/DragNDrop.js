const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const productsListEl = document.getElementById('products-list');
const breakfastListEl = document.getElementById('breakfast-list');


// Items
let updatedOnLoad = false;

// Initialize Arrays
let productsListArray = [];
let breakfastListArray = [];
let lunchListArray = [];
let dinnerListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('productsItems')) {
    productsListArray = JSON.parse(localStorage.productsItems);
    breakfastListArray = JSON.parse(localStorage.breakfastItems);

  } else {
    productsListArray = ['Gold Coast, Australia', 'Jeffreys Bay, South Africa', 'Ericeira, Portugal', 'Puerto Escondido, Mexico','Oahu, Hawaii, USA'];
    breakfastListArray = ['Lahinch, Ireland', 'Mullaghmore, Ireland'];

  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [productsListArray, breakfastListArray, lunchListArray, dinnerListArray];
  const arrayNames = ['products', 'breakfast'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
}

// Filter Array to remove empty values
function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.textContent = item;
  listEl.id = index;
  listEl.classList.add('drag-item');
  listEl.draggable = true;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  // Append
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // products Column
  productsListEl.textContent = '';
  productsListArray.forEach((productsItem, index) => {
    createItemEl(productsListEl, 0, productsItem, index);
  });
  productsListArray = filterArray(productsListArray);
  // breakfast Column
  breakfastListEl.textContent = '';
  breakfastListArray.forEach((breakfastItem, index) => {
    createItemEl(breakfastListEl, 1, breakfastItem, index);
  });
  breakfastListArray = filterArray(breakfastListArray);

  updatedOnLoad = true;
  updateSavedColumns();
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumn = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumn[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumn[id].textContent;
    }
    updateDOM();
  }
}

// Add to Column List, Reset Textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM(column);
}

// Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

// Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  productsListArray = [];
  for (let i = 0; i < productsListEl.children.length; i++) {
    productsListArray.push(productsListEl.children[i].textContent);
  }
  breakfastListArray = [];
  for (let i = 0; i < breakfastListEl.children.length; i++) {
  breakfastListArray.push(breakfastListEl.children[i].textContent);
  }

 
  updateDOM();
}

// When Item Enters Column Area
function dragEnter(column) {
  listColumns[column].classList.add('over');
  currentColumn = column;
}

// When Item Starts Dragging
function drag(e) {
  draggedItem = e.target;
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// Dropping Item in Column
function drop(e) {
  e.preventDefault();
  const parent = listColumns[currentColumn];
  // Remove Background Color/Padding
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });
  // Add item to Column
  parent.appendChild(draggedItem);
  // Dragging lunch
  dragging = false;
  rebuildArrays();
}

// On Load
updateDOM();
