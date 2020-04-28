import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/auhContext';
const NuevaCuenta = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de q el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() =>{

        //Redireccion
        if(autenticado){
            props.history.push('./proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history ]);

    const [usuario, guardarUsuario] = useState({
        
        nombre:'',
        email:'',
        password:'',
        confirmar:''

    });

    //Extraemos los valores
    const {nombre, email, password, confirmar} = usuario;

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        //Validar que no haya campos vacios 
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El passowrd debe ser de al menos 6 caracteres', 'alerta-error')
            return;
        }
        //Los dos passwords sean iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords deben ser iguales', 'alerta-error');
            return;
        }

        //Pasar al action
        registrarUsuario({
            nombre, 
            email, 
            password
        });
    }


    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Registrate</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Tu nombre"
                        onChange={onChange}
                        value={nombre}
                        />
                    </div>


                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Tu email"
                        onChange={onChange}
                        value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Tu password"
                        onChange={onChange}
                        
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirma tu password</label>
                        <input
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Confirma tu password"
                        onChange={onChange}
                        value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit" className="btn btn-primario btn-block" value="Registrarme"
                        />
                    </div>
                </form>
                <Link to="/" className="enlace-cuenta">Inicia Sesión</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta