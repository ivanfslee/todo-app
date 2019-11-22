// html for adding a new todo
function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"> 
    <span class="item-text">${item.text}</span>
    <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button> 
    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
    </li>` 
}

// Create todo
let createField = document.getElementById('create-field');

document.getElementById('create-form').addEventListener('submit', function(e) {
    e.preventDefault();
    axios.post('/create-item', {text: createField.value}).then(function(response) { //response parameter is the todoItem from backend, sent after adding to database. response is an object 
        console.log(response);
        
        //create html for the new item
        document.getElementById('item-list').insertAdjacentHTML('beforeend', itemTemplate(response.data));
        
        //clear out input field and refocus cursor
        createField.value = "" 
        createField.focus(); 
    }).catch(function() {
        console.log('Please try again later');
    }); 
})


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