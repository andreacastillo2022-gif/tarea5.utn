
import { useState, useEffect, useRef, useMemo } from "react";
import "./app.css";
import useLocalStorage from "./hooks/useLocalStorage";


function App() { 

  const [busqueda, setBusqueda] = useState("");
  const inputRef = useRef(null);

  const  tareasIniciales = ([
    { id: 1, titulo: "Encender la computadora", completada: false },
    { id: 2, titulo: "Hacer la tarea de Hooks", completada: false },
    { id: 3, titulo: "Tomar té", completada: true }
  ])

  const [tareas, setTareas] = useLocalStorage("tareas", tareasIniciales);

  const[nuevaTarea, setNuevaTarea] = useState("");
  
  function agregarTarea(titulo) {
    if (!titulo.trim()) return; 
      const nueva = {
        id: Date.now(),
        titulo,
        completada: false
    };

  setTareas([...tareas, nueva]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarTarea(nuevaTarea);
    setNuevaTarea("");
  };


  const eliminarTarea = (id) => {
  setTareas(tareas.filter(t => t.id !== id));
  };

  const completarTarea = (id) => {
  setTareas(
    tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    )
    );
  };



  const tareasFiltradas = useMemo(() => {
    return tareas.filter(t =>
      t.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [tareas, busqueda]);


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            ref={inputRef}
            type="text"
            placeholder="Agregar tarea"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            />
            <button type = "submit">Agregar</button>

            <br/>
      
            <input
            type="text"
            placeholder="Buscar tarea"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            />

        </form>

      <table>
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Terminado</th>
            <th>Borrar</th>
          </tr>
        </thead>

      <tbody>
          {tareasFiltradas.map(tarea => (
          <tr key={tarea.id}>
            <td className={tarea.completada ? "tarea-completada" : ""}>
            {tarea.titulo}
            </td>

            <td>
              <button className="btn-confirmar" onClick={() => completarTarea(tarea.id)}>✔</button>
              
            </td>

            <td>
              <button className="btn-eliminar" onClick={() => eliminarTarea(tarea.id)}>✖</button>
            </td>
          </tr>
          ))}
      </tbody>
      </table>


    </div>
  );
}

export default App;


