import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; //SE IMPORTA BOOSTRAP DENTRO DE REACT//
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function App() {
  const MySwal = withReactContent(Swal)
  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState();
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState(); 
  const [id,setId] = useState(); //Variables que gestionan los valores d elos campos Recordemos que 
  // Variable que va almacenar el valor, Funcion que manda el acceso a la variable.

  const [editar,setEditar] = useState (false);



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
        limpiarCampo();
        Swal.fire({
          title:" Registro Exitoso !!",
          html: "El usuario se ha registrado en el sistema de forma correcta.",
          icon: 'success'
        });
      });
  }
  // Realiza el update al empleado
  const update = () =>
  {
      Axios.put("http://localhost:3001/update",{
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios
      }).then(()=>
      {
        getEmpleados();
        limpiarCampo();
      });
  }
  const borrarEmpleado = (id) =>
  {
       Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>
      {
        getEmpleados();
        Swal.fire({
          title:" Usuario eliminado !!",
          html: "El usuario se borrado del sistema.",
          icon: 'success'
        });
      });
  }
  //Limpiar campos
  const limpiarCampo = () =>
  {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
    setEditar(false);
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
  // getEmpleados();



  const editarEmpleado = (val)=> {
      setEditar (true);
      setNombre(val.nombre);
      setEdad(val.edad);
      setPais(val.pais);
      setCargo(val.cargo);
      setAnios(val.anios);
      setId(val.id);
  }


  return (
    <div className='container'>
      <div className="App">

      <div className="card text-center">
              <div className="card-header">
               Ingrese información
              </div>
            
            <div className="card-body">
               <div className="input-group mb-3">
                 <span className="input-group-text" id="basic-addon1">Nombre:</span>
                  <input type="text" value={nombre}
                    onChange={(event)=>{
                      setNombre(event.target.value);
                    }}
                  className="form-control" placeholder="Ingrese su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
               </div>

               <div className="input-group mb-3">
                 <span className="input-group-text" id="basic-addon1">Edad:</span>
                  <input type="number" value={edad}
                    onChange={(event)=>{
                      setEdad(event.target.value);
                    }} 
                  className="form-control" placeholder="Ingrese su Edad" aria-label="Username" aria-describedby="basic-addon1"/>
               </div>

               <div className="input-group mb-3">
                 <span className="input-group-text" id="basic-addon1">Pais:</span>
                  <input type="text" value={pais}
                    onChange={(event)=>
                      {
                        setPais(event.target.value);
                      }}
                  className="form-control" placeholder="Ingrese su Pais" aria-label="Username" aria-describedby="basic-addon1"/>
               </div>

               <div className="input-group mb-3">
                 <span className="input-group-text" id="basic-addon1">Cargo:</span>
                  <input type="text" value={cargo}
                    onChange={(event)=>{
                      setCargo(event.target.value);
                    }}
                  className="form-control" placeholder="Ingrese su Cargo" aria-label="Username" aria-describedby="basic-addon1"/>
               </div>

               <div className="input-group mb-3">
                 <span className="input-group-text" id="basic-addon1">Años:</span>
                  <input type="number" value={anios}
                    onChange={(event) => {
                      setAnios(event.target.value);
                    }}
                  className="form-control" placeholder="Ingrese su edad ejerciendo" aria-label="Username" aria-describedby="basic-addon1"/>
               </div>
            </div>
            <div className="card-footer text-body-secondary">
              {
                editar==true?
                <div>
                <button className='btn btn-warning me-3' onClick={update}>Actualizar</button> 
                <button className='btn btn-info me-3' onClick={limpiarCampo}>Cancelar</button> 
                </div>
                :
                <div>
                  <button className='btn btn-success me-3' onClick={agregarDatos}>Registrar</button>
                  <button className='btn btn-danger me-3' onClick={limpiarCampo}>Limpiar</button>
                </div>
              }
              
              <button className='btn btn-success' onClick={getEmpleados}>Listar</button><br/>
            </div>
      </div>
      <table className="table table-striped">
              <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Años de experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {
            empleadosList.map((val,key)=>
            {
              return <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info"
                onClick={()=>{
                editarEmpleado(val);
                }}>Editar</button>
                <button type="button" onClick={() =>
                {
                  borrarEmpleado(val.id);
                }} className="btn btn-danger">Eliminar</button>

              </div>
              </td>
            </tr>
            })
          }
           
          </tbody>
      </table>
        


    </div>
  </div>
  );
}

export default App;
