document.addEventListener('click', function(e) { 
    console.log('This log is logged to the browser\'s console, not terminal/node.js')
    if (e.target.classList.contains('edit-me')) { 
        let userInput = prompt("Enter your desired text", e.target.parentElement.parentElement.querySelector('.item-text').innerHTML);
        if (userInput) {
            axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function () {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput;
            }).catch(function() {
                console.log('Please try again later');
            }); 
        }
    }
});