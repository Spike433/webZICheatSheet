
var http= require('http');
const Joke = require('awesome-dev-jokes');



    setInterval(()=>{
    console.log(Joke.getRandomJoke());
    },2000);
