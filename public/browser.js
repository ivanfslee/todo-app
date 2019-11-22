document.addEventListener("click", function(e) { 
    console.log('This log is logged to the browser\'s console, not terminal/node.js')
    if (e.target.classList.contains("edit-me")) { 
        let userInput = prompt("Enter your desired text")
        axios.post('/update-item', {text: userInput}).then(function () {
            //do something interesting 
        }).catch(function() {
            console.log('Please try again later');
        }); 
    }
});