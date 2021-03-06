import './Login.css';
import './Inicio.css';
import React, {useContext, useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import grafica from "./graficas.png";
import Footer from './components/Footer/Footer';
import {MyContext} from './contexts/MyContext';
import {Link as LinkR} from 'react-router-dom';


function Inicio(){

    const {rootState} = useContext(MyContext);
    const {isAuth} = rootState;


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen);
    };
     
    let ContestarEncuesta;
        
    if (isAuth)
        ContestarEncuesta = <LinkR  to="/Encuesta">ContestarEncuesta</LinkR>
    else
        ContestarEncuesta = <LinkR  to="/Registro">ContestarEncuesta</LinkR>
        
    return(
        <>
        <Navbar toggle={toggle}/>;
        <Sidebar isOpen={isOpen} toggle={toggle} />;
        <head>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet"/> 
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet"/> 
        </head>
        <div id = "uno">
            
            <main>
                    <div className="bloque">
                        <h1>Analizando los efectos del COVID-19 </h1>
                        <div className="b1 ">
                            <img className="imgInicio" src={grafica}/>     
                        </div>
                        <div class="b2 ">
                            <p className="texto">A inicios del año 2020 inició la pandemia de COVID-19 la cual llegó para cambiar la vida de las personas 
                            en varios aspectos como culturales, sociales, de salud pública, económicos y cotidianos. Por esta razón la mayoría de la gente ha 
                            modificado su estilo de vida, adaptándose a la nueva normalidad y a las posibilidades que esta permite.

                            
                            </p>   
                        </div>
                    </div>
                    
                    <p className="texto">
                    Es por ello que el equipo de Blue Desert se dio a la tarea de crear este sitio con la finalidad de recabar información
                             del público en México para analizar cómo ha afectado la pandemia en la vida de las personas y detectar las nuevas tendencias de
                              consumo que se han generado por esta situación. 

                    El sitio consiste en una serie de preguntas relacionadas con tu estilo de vida y como se ha visto afectado. Lo único que tienes que hacer es registrarte y contestar las preguntas, 
                     luego de eso podrás ver la información obtenida de los datos recabados de quienes la han contestado y darte una idea de que 
                     es lo que ha cambiado en la vida de las personas de México. </p>   
                    
            </main>
            <Footer/>
        </div>
        </>
         
    );
    
}

export default Inicio;