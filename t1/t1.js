// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false
  }
];

// add your code here
const ulElement = document.querySelector('ul');
const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('.add-btn');
const form = dialog.querySelector('form');
const input = form.querySelector('input');

// Function to generate unique ID
function generateId() {
  return Math.max(...todoList.map(todo => todo.id), 0) + 1;
}

// Function to update todoList array when checkbox state changes
function updateTodoList(todoId, isCompleted) {
  const todoItem = todoList.find(todo => todo.id === todoId);
  if (todoItem) {
    todoItem.completed = isCompleted;
    console.log('Updated todoList array:', todoList);
  }
}

// Function to delete todo item from array and DOM
function deleteTodoItem(todoId) {
  // Remove from todoList array
  const index = todoList.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todoList.splice(index, 1);
    console.log('Updated todoList array after deletion:', todoList);
  }

  // Remove from DOM
  const listItem = document.getElementById(`todo-item-${todoId}`);
  if (listItem) {
    ulElement.removeChild(listItem);
  }
}

// Function to add new todo item
function addTodoItem(taskName) {
  const newTodo = {
    id: generateId(),
    task: taskName,
    completed: false
  };

  todoList.push(newTodo);
  console.log('Updated todoList array after adding new item:', todoList);

  // Add to DOM
  const html = `
    <li id="todo-item-${newTodo.id}">
      <input type="checkbox" id="todo-${newTodo.id}">
      <label for="todo-${newTodo.id}">${newTodo.task}</label>
      <button type="button" class="delete-btn" data-id="${newTodo.id}">Delete</button>
    </li>
  `;
  ulElement.insertAdjacentHTML('beforeend', html);

  // Add event listeners to new elements
  const checkbox = document.getElementById(`todo-${newTodo.id}`);
  checkbox.addEventListener('change', function () {
    updateTodoList(newTodo.id, this.checked);
  });

  const deleteBtn = document.querySelector(`[data-id="${newTodo.id}"]`);
  deleteBtn.addEventListener('click', function () {
    const todoId = parseInt(this.getAttribute('data-id'));
    deleteTodoItem(todoId);
  });
}

// Function to render todo list
function renderTodoList() {
  todoList.forEach(todo => {
    const checked = todo.completed ? 'checked' : '';
    const html = `
      <li id="todo-item-${todo.id}">
        <input type="checkbox" id="todo-${todo.id}" ${checked}>
        <label for="todo-${todo.id}">${todo.task}</label>
        <button type="button" class="delete-btn" data-id="${todo.id}">Delete</button>
      </li>
    `;
    ulElement.insertAdjacentHTML('beforeend', html);
  });
}

// Initialize the todo list
renderTodoList();

// Add event listeners to all checkboxes
todoList.forEach(todo => {
  const checkbox = document.getElementById(`todo-${todo.id}`);
  checkbox.addEventListener('change', function () {
    updateTodoList(todo.id, this.checked);
  });
});

// Add event listeners to all delete buttons
todoList.forEach(todo => {
  const deleteBtn = document.querySelector(`[data-id="${todo.id}"]`);
  deleteBtn.addEventListener('click', function () {
    const todoId = parseInt(this.getAttribute('data-id'));
    deleteTodoItem(todoId);
  });
});

// Modal functionality
addBtn.addEventListener('click', () => {
  dialog.showModal();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = input.value.trim();

  if (taskName) {
    addTodoItem(taskName);
    input.value = '';
    dialog.close();
  }
});
