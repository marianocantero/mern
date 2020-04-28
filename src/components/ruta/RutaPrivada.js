import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/auhContext';


                    //Esto quiere decir componente dentro de otro componente
const RutaPrivada = ({component: Component, ...props}) => {


    const authContext = useContext(AuthContext);
    const { autenticado, cargando,  usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();

        //eslint-disable-next-line
    }, []);

    return ( 
        <Route {...props} render= { props=> !autenticado && !cargando ?  (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} 
        
        />
     );
}
 
export default RutaPrivada;