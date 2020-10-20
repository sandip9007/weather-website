// const fetch = require('fetch');

fetch('http://localhost:5000/weather?address=mumbai').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })

})