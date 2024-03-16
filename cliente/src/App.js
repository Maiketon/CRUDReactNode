import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState(0); //Variables que gestionan los valores d elos campos Recordemos que 
  // Variable que va almacenar el valor, Funcion que manda el acceso a la variable.

  const [empleadosList,setEmpleados] = useState([]);

  // const mostrarDatos = () =>
  // {
  //   alert(nombre+edad+pais+cargo+anios);
  // }


    //Realiza una peticion al servidor para guardar datos en Bd//
  const agregarDatos = () =>
  {
      Axios.post("http://localhost:3001/create",{
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios
      }).then(()=>
      {
        getEmpleados();
        alert("Empleado registrado");
      });
  }
  const getEmpleados = () =>
  {
      Axios.get("http://localhost:3001/empleados").then((response)=>
      {
        setEmpleados (response.data);
      });
  }

  //Otra forma es mandar a llamar el metodo aqui el metodo de obtener datos, para que siempre que se inicialice el servidor
  // se muestre en pantalla la informacion
  getEmpleados();



  return (
    <div className="App">
      <div className='datos'>
        <label>Nombre: <input type='text'onChange={(event)=>{
          setNombre(event.target.value);
        }}/></label> <br/>
        <label>Edad: <input type='number' onChange={(event)=>{
          setEdad(event.target.value);
        }} /></label> <br/>
        <label>Pais: <input type='text' onChange={(event)=>
        {
          setPais(event.target.value);
        }}/></label> <br/>
        <label>Cargo: <input type='text' onChange={(event)=>{
          setCargo(event.target.value);
        }}/></label> <br/>
        <label>Años: <input type='number'onChange={(event) => {
          setAnios(event.target.value);
        }}/></label> <br/>
        <button onClick={agregarDatos}>Registrar</button> <br/>
        <div className='lista'>
        {
          empleadosList.map((val,key)=>
          {
            return <div className=''>{val.nombre}<br/></div>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default App;
