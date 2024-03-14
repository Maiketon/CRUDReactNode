const express = require ("express");
const app = express();


app.listen(3001,()=>
{
    console.log("Estoy escuchando por parte del controlador");
}) //Nuestra app va a escucchar por el puerto 3001/