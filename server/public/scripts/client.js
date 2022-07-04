$(document).ready(function() {
    console.log('Jquery and js working');
    clickHandlers();
    getTasks();
})
// click handler where add, complete and delete buttons will be called. 
function clickHandlers() {
    $('.submit').on('click', addTask);
    $('.task-container').on('click', '.completeButton', markAsComplete);
    $('.task-container').on('click', '.deleteButton', deleteTask);
}

// gets the tasks and prints them to the DOM. Function also called in add, complete and delete functions
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/todo'
    })
    .then(function(response) {
        console.log(response);
        render(response);
    })
    .catch(function(error){
        console.log('error in GET', error);
    });
}

// Show data from SQL to the DOM. Also appends a button for isComplete
function render(todoList) {
    $('.task-container').empty();
// iterates through each object and appends them to teh DOM on lines 37-54
    for(let i = 0; i< todoList.length; i++) {
        let currentTask = todoList[i];

        $('.task-container').append(`
        <tr data-isComplete="${currentTask.isComplete}" class="taskRow">
            <td>${currentTask.id}</td>
            <td>${currentTask.task}</td>
            <td>${currentTask.importance}</td>
            <td>${currentTask.isComplete}</td>
            <td>
                <button
                class="button completeButton"
                data-status="${currentTask.isComplete}" data-id="${currentTask.id}"
                >Complete
                </button>
            </td>
            <td>
                <button class="button deleteButton"
                data-id= "${currentTask.id}"
                >Delete
                </button>
            </td>
        </tr>
        `)
    }
}
// add button to add task to the sql
function addTask() {
    console.log('Submit button has been clicked');
    let taskToAdd = {};
    taskToAdd.task = $('.taskInput').val();
    taskToAdd.importance = $('.importanceInput').val();
    console.log('checking that current object is taking in the 2 inputs', taskToAdd);

    $.ajax({
        method: 'POST',
        url: '/todo',
        data: taskToAdd,
    }).then(function(response) {
        console.log('Response from server.', response);
        getTasks();
    }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add new task From addTask function in CLIENT');
    });
}


// function to add a class and change the color of tasks on the DOM based on "isComplete" being true or false.
function markAsComplete() {
    let taskId = $(this).data('id');
    let taskStatus = $(this).data('status');
    console.log('task ID is:', taskId);
    // Boolean 
    console.log('boolean being sent from the client is:', taskStatus);

    $.ajax({
        method: 'PUT',
        url: `/todo/${taskId}`,
        data:{status: taskStatus}
    })
    .then(function() {
        getTasks();
    })
    .catch(function(error) {
        alert('ERROR on markAsComplete Function:', error);
    })
}
// delete takes in the attribute id from button on line 51 in the append.
// Sends that id to the server and runs an sql statement to delete WHERE the id is matching. 
function deleteTask() {
    let taskId = $(this).data('id');
    $.ajax({
    method: 'DELETE',
    url: `todo/${taskId}`
    })
    .then(function(response) {
        console.log('It is gone!');
        getTasks();
    })
    .catch(function(error) {
        alert('Error deleting TASK in client:', error);
    });
}