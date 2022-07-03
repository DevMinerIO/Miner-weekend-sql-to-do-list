$(document).ready(function() {
    console.log('Jquery and js working');
    clickHandlers();
    getTasks();
})

function clickHandlers() {
    $('.submit').on('click', addTask);
    $('.task-container').on('click', '.completeButton', markAsComplete);
}

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

// Shows data from SQL to the DOM. Also appends a button for isComplete
function render(todoList) {
    $('.task-container').empty();

    for(let i = 0; i< todoList.length; i++) {
        let currentTask = todoList[i];

        $('.task-container').append(`
        <tr>
            <td>${currentTask.id}</td>
            <td>${currentTask.task}</td>
            <td>${currentTask.importance}</td>
            <td>${currentTask.isComplete}</td>
            <td>
                <button
                class="button completeButton"
                data-id=${currentTask.id}
                data-isComplete= ${currentTask.isComplete}>Complete
                </button>
            </td>
            <td>
                <button class="button deleteButton"
                data-id= ${currentTask.id}
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
    // ! should flip the boolean to the opposite of what it was. Then we will send that to the server. 
    let flipComplete = $(this).data('isComplete');
    console.log('boolean should be flipped', flipComplete);

    $.ajax({
        method: 'PUT',
        url: `/todo/${taskId}`,
        data:{isComplete: flipComplete}
    })
    .then(function() {
        getTasks();
    })
    .catch(function(error) {
        alert('ERROR on markAsComplete Function:', error);
    })
}