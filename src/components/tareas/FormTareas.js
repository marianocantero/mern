import React, {useContext, useState, useEffect} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, agregarTarea, errortarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])

    //State de la tarea
    const [tarea, guardarTarea] = useState({
        nombre:''
    })

    const {nombre} = tarea;

    if(!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Leer los valoers del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //Validar
        if(nombre.trim() ===''){
            validarTarea();
            return;
        
        }

        //Si es edicion o es tarea nueva
        if(tareaseleccionada === null){
            //pasar la valicaion
            tarea.proyecto = proyectoActual._id;
            
            agregarTarea(tarea);
        } else {
            //Actualizar tarea
            actualizarTarea(tarea);
            //Elimina tarea seleccionada del state
            limpiarTarea();
        }

        

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //Reiniciar el form
        guardarTarea({
            nombre:''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;