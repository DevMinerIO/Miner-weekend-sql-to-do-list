$(document).ready(function() {
    console.log('Jquery and js working');
    clickHandlers();
    getTasks();
})

function clickHandlers() {
    //$('.submit').on('click', );

}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/todo'
    })
    .then(function(response) {
        console.log(response);
        renderBooks(response);
    })
    .catch(function(error){
        console.log('error in GET', error);
    });
}