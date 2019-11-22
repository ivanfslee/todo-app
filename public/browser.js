document.addEventListener('click', function(e) { 
    console.log('This log is logged to the browser\'s console, not terminal/node.js')

    // Delete todo
    if (e.target.classList.contains('delete-me')) {
        if (confirm('Do you really want to delete this item?')) { //confirm is a browser method
            axios.post('/delete-item', {id: e.target.getAttribute('data-id')}).then(function() {//asynchronous request to server
                e.target.parentElement.parentElement.remove() ;//this line will run once our database action completes, and a response is sent back to the web browser
            }).catch(function() {
                console.log('Please try again later');
            }); 
        }
    }

    // Update/edit todo
    if (e.target.classList.contains('edit-me')) { 
        let userInput = prompt("Enter your desired text", e.target.parentElement.parentElement.querySelector('.item-text').innerHTML);
        if (userInput) {
            axios.post('/update-item', {text: userInput, id: e.target.getAttribute('data-id')}).then(function () {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput;
            }).catch(function() {
                console.log('Please try again later');
            }); 
        }
    }
});