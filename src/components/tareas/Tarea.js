import React, {useContext} from 'react';

import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Extraer el proyectoa actual
    const [proyectoActual] = proyecto;

    //Funcion que se ejecuta cuando el usuario da a eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        } else {
            tarea.estado = true;
            
        }

        actualizarTarea(tarea);
    }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">   
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                ?
                    (
                        <button type="button"
                        className="completo"
                        onClick= { () => cambiarEstado(tarea)}
                        >Completo</button>
                    )

                :   
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick= { () => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )

                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick= {() => tareaEliminar(tarea._id)}
                >Borrar</button>
            </div>

        </li>
    );
}
 
export default Tarea;