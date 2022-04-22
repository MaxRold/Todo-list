const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addToDo(event) {
    event.preventDefault();

    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('newItem')
    toDoDiv.appendChild(newTodo)

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    const checkBtn = document.createElement('button')
    checkBtn.innerHTML = ('<i class="fa-solid fa-square-check">')
    checkBtn.classList.add('check')
    toDoDiv.appendChild(checkBtn)

    const treashBtn = document.createElement('button')
    treashBtn.innerHTML = ('<i class="fa-solid fa-trash">')
    treashBtn.classList.add('trash')
    toDoDiv.appendChild(treashBtn)

    todoList.appendChild(toDoDiv)

    todoInput.value = '';
}


function deleteCheck(e) {
    const item = e.target;
    //DELETE
    if (item.classList[0] === 'trash') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
        }

    if (item.classList[0] === 'check') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    });
}


function saveLocalTodos(todo) {
    // CHECK --- Do I already have things here
    let todos;
    if(localStorage.getItem('todos') ===null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') ===null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const toDoDiv = document.createElement('div')
        toDoDiv.classList.add('todo')
    
        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add('newItem')
        toDoDiv.appendChild(newTodo)
    
        const checkBtn = document.createElement('button')
        checkBtn.innerHTML = ('<i class="fa-solid fa-square-check">')
        checkBtn.classList.add('check')
        toDoDiv.appendChild(checkBtn)
    
        const treashBtn = document.createElement('button')
        treashBtn.innerHTML = ('<i class="fa-solid fa-trash">')
        treashBtn.classList.add('trash')
        toDoDiv.appendChild(treashBtn)
    
        todoList.appendChild(toDoDiv) 
    })

}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') ===null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}