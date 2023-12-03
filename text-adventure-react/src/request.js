const request = (e) => {

e.preventDefault();
const request = {output}

fetch('https://localhost:8000/request', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(request)
}).then (() => {
    console.log("Post successful");
})

}