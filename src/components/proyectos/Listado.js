import React, { useContext, useEffect } from 'react';
import Proyecto from '../proyectos/Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'



const Listado = () => {

    //Extraccion de proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, mensaje,  obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext;
    useEffect(() => {

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();

        //eslint-disable-next-line
    }, [mensaje])

    //Revisar si hay proyectos en el arreglo
    if(proyectos.length === 0){
        return <p>No hay proyectos</p>;
    }

    return ( 
        <ul className="listado-proyectos">

            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</div>) : null}
            <TransitionGroup>
            {proyectos.map(proyecto => (
                <CSSTransition
                key={proyecto._id}
                timeout={200}
                classNames="proyecto"
                >
                     <Proyecto
                    
                    proyecto={proyecto} 
                />
                </CSSTransition>
            ))}
        
            </TransitionGroup>
        </ul>
     );
}
 
export default Listado;