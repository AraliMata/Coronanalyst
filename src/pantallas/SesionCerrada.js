import './SesionCerrada.css';
import logo from '../imagenes/logo_coronanalyst.jpeg';
import React, { useContext, useState } from 'react';
import { MyContext } from '../contexts/MyContext';
import { Link as LinkR } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import {Redirect} from "react-router-dom";

function SesionCerrada() {

  const { rootState, loginUser, isLoggedIn } = useContext(MyContext);
  const { isAuth, type, profile, survey } = rootState;

  const initialState = {
    userInfo: {
      email: '',
      password: '',
    },
    errorMsg: '',
    successMsg: '',
  }

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value
      }
    });
    console.log(state);
  }

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      console.log("Data recieved, changing stage");
      setState({
        ...initialState,
        successMsg: data.message
      });
      console.log("Data recieved, storing token: " + data.token);
      // Store token in local storage
      localStorage.setItem('loginToken', data.token);
      console.log("Token stored");
      await isLoggedIn();

      //await hasProfile();
      <Redirect to="/" />

    }
    else {
      setState({
        ...state,
        successMsg: '',
        errorMsg: data.message
      });
    }
  }

  // Show Message on Error or Success
  let successMsg = '';
  let errorMsg = '';
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }


  if (isAuth) {
    if(type==="general"){
      if(profile){
        if(survey){
          console.log("Redirecting to home (profile and survey completed)")
          return <Redirect to="/" />
        }
        else{
          console.log("Redirecting to survey")
          return <Redirect to="/Encuesta"/>
        }
      }
      else{
        console.log("Redirecting to profile creation page")
        return <Redirect to="/DatosPersonales"/>
      }
    }
    else{
      console.log("Redirecting to home (user is an admin/editor)")
      return <Redirect to="/" />
    }
  } else {
    return (
      <>
        <Sidebar />
        <Navbar />
        <div className="split left">
          <div className="centered">
            <h1>Sesión cerrada</h1>
            <p>Introduce tu correo y contraseña para acceder</p>
            <form onSubmit={submitForm} noValidate>
              <input type="text" id="email" name="email" required placeholder="Ingresa correo electrónico" value={state.userInfo.email} onChange={onChangeValue} />
              <input type="password" id="password" name="password" required placeholder="Ingresa contraseña" value={state.userInfo.password} onChange={onChangeValue} />

              <button type="submit" className="submit" > Entrar </button>
            </form>

            {errorMsg}
            {successMsg}
          </div>
        </div>

        <div className="split right">
          <div className="centered">
            <img src={logo} alt="Logo coronanalyst" />
            <button className="link">
              <LinkR to="/">Regresar a inicio</LinkR>
            </button>
          </div>
        </div>

      </>
    );
  }
}


export default SesionCerrada;