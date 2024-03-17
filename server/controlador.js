const express = require ("express");
const app = express();
const mysql = require ("mysql2");
const cors = require("cors");

app.use(cors());
app.use (express.json());


//Creamos una conexion a la base de datos //
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "empleados_crud"
    }
);
//Verificamos la conexion con exito//
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con éxito a la base de datos');
});
//Abrimos el puerto por el que esta leyendo el front con el back//
app.listen(3001,()=>
{
    console.log("Estoy escuchando por parte del controlador");
}) //Nuestra app va a escucchar por el puerto 3001/


//Primera funcion por asi decirlo para guardar datos//
app.post("/create",(peticion,res)=> //Esta es lapeticion que creamos para guardar los datos//
//peticion --> conjunto de arreglo que le llegan ... res--> Si la op fue exitosa envia un send al front
{
    const nombre = peticion.body.nombre;
    const edad = peticion.body.edad;
    const pais = peticion.body.pais;
    const cargo = peticion.body.cargo;
    const anios = peticion.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if (err)
        {
            console.log("Hubo un error al guardar los datos");
            console.log(err);
        }
        else
        {
            res.send("Empleado registrado correctamente!!!");
        }
    });
});


app.get("/empleados",(peticion,res)=> //Esta es lapeticion que creamos para guardar los datos//
//peticion --> conjunto de arreglo que le llegan ... res--> Si la op fue exitosa envia un send al front
{

    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if (err)
        {
            console.log("Hubo un error");
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});



app.put("/update",(peticion,res)=> //Esta es lapeticion que creamos para guardar los datos//
//peticion --> conjunto de arreglo que le llegan ... res--> Si la op fue exitosa envia un send al front
{
    const id = peticion.body.id;
    const nombre = peticion.body.nombre;
    const edad = peticion.body.edad;
    const pais = peticion.body.pais;
    const cargo = peticion.body.cargo;
    const anios = peticion.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if (err)
        {
            console.log("Hubo un error al actualiar los datos");
            console.log(err);
        }
        else
        {
            res.send("Empleado actualizado correctamente!!!");
        }
    });
});



app.delete("/delete/:id", (peticion, res)=>
{
    const id = peticion.params.id;
    db.query('DELETE FROM empleados WHERE id=?',id,
    (err,result)=>{
        if (err)
        {
            console.log("Hubo un error al eliminar los datos");
            console.log(err);
        }
        else
        {
            res.send("Empleado Eliminado correctamente!!!");
        }
    });
});