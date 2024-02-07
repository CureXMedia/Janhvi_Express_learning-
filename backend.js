
const form = document.getElementById('myForm')
form.addEventListener('submit',handleSubmit)

var outputBox = document.getElementById('outputBox');


async function handleSubmit(event) {
    event.preventDefault();
    var userInputValue = document.getElementById('userInput').value;
    fetch(`http://localhost:3000/reply`,{
        body: JSON.stringify({question: userInputValue}),
        method:"POST",
        'Content-type': "application/json",
    })

.then(re=>resizeBy.json())
.then(rs=>{
    outputBox.innerText = 'Output:'
    outputBox.innerText += res.text
    console.log(res)
}).catch((err)=>console.log(err))

}






