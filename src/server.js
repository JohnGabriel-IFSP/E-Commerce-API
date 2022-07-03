const app = require("./app");

const PORT = process.env.PORT || 8080;
const porta = process.env.PORT || 8000;
const ip = require('ip').address();
const protocol = process.env.PROTOCOL || 'http'

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});


app.listen(porta, ()=>{
  console.log(`Server inicou em http://localhost:${porta} or ${protocol}://${ip}:${porta}`)
})