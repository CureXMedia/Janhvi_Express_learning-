
const form = document.getElementById('myForm')
form.addEventListener('submit',handleSubmit)

var outputBox = document.getElementById('outputBox');


// async function handleSubmit(event) {
//     event.preventDefault();
//     var userInputValue = document.getElementById('userInput').value;
//     fetch(import.meta.env.VITE_BACKEND_URL+'/reply',{
//         body: JSON.stringify({question: userInputValue}),
//         method:"POST",
//         headers:{
//         'Content-type': "application/json",
//     }
//     })

// .then(res=>res.json())
// .then(res1=>{
//     outputBox.innerText = 'Output:'
//     outputBox.innerText += res1.text
//     console.log(res1)
// }).catch((err)=>console.log(err))

// }

const retry = false;
async function handleSubmit(event) {
    event.preventDefault();
    var userInputValue = document.getElementById('userInput').value;
    outputBox.innerText = 'Output:'

    const evs = new EventSource(`http://localhost:3000/api/reply?question=${userInputValue}`);
    
    evs.addEventListener('close', () => {
        evs.close();
        showMessage('Connection Closed');
    });
    evs.addEventListener('error', (e) => {
        console.log(e);

        // determine whether or not to retry
        if (!retry) {
            evs.close();
        }
    });
    
    evs.addEventListener('message', (ev) => {
        outputBox.innerText += JSON.parse(ev.data).value
        
        console.log(ev.data)
    });
}




