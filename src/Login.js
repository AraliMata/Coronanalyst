import logo from './imagenes/logo_coronanalyst.jpeg'
import './Login.css';
import React, {useContext, useState} from 'react'
import {MyContext} from './contexts/MyContext';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import {Link as LinkR} from 'react-router-dom';
import {Redirect} from "react-router-dom";

function Login() {

  const [isOpen, setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen)
    };

  const {rootState,loginUser,isLoggedIn} = useContext(MyContext);
  const {isAuth,type,profile,survey} = rootState;

  const initialState = {
    userInfo:{
        email:'',
        password:'',
    },
    errorMsg:'',
    successMsg:'',
  }

  const [state,setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
        ...state,
        userInfo:{
            ...state.userInfo,
            [e.target.name]:e.target.value
        }
    });
    console.log(state);
  } 

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if(data.success && data.token){
        console.log("Data recieved, changing stage");
        setState({
            ...initialState,
            successMsg:data.message
        });
        console.log("Data recieved, storing token: "+data.token);
        // Store token in local storage
        localStorage.setItem('loginToken', data.token);
        console.log("Token stored");
        await isLoggedIn();
    }
    else{
        setState({
            ...state,
            successMsg:'',
            errorMsg:data.message
        });
    }
  }

  // Show Message on Error or Success
  let successMsg = '';
  let errorMsg = '';
  if(state.errorMsg){
      errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if(state.successMsg){
      successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  if(isAuth){
    if(type=="general"){
      if(profile){
        if(survey){
          console.log("Redirecting to home")
          return <Redirect to="/" />
        }
        else{
          console.log("Redirecting to survey")
          return <Redirect to="/Encuesta" />
        }
      }
      else{
        console.log("Redirecting to profile creation page")
        return <Redirect to="/DatosPersonales" />
      }
    }
    else{
      console.log("Redirecting to home")
      return <Redirect to="/" />
    }
  }
  else{
    return (
   
      <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <div>
        <div className="split left">
          <div className="centered">
            <div>
            <h1>??Bienvenido!</h1>
            <p>Introduce tu correo y contrase??a para acceder</p>
            </div>
            <form onSubmit={submitForm} noValidate>
  
              <input type="text" id="email" name="email" required placeholder="Ingresa correo electr??nico" value={state.userInfo.email} onChange={onChangeValue}/>
              <input type="password" id="password" name="password" required placeholder="Ingresa contrase??a" value={state.userInfo.password} onChange={onChangeValue} />
                 
              <button type="submit" className = "submit" > Iniciar sesi??n </button>
            </form>
            {errorMsg}
            {successMsg}
            <b><p><LinkR id="ref" to="/Registro">??No tienes cuenta? Reg??strate aqu??</LinkR></p></b>
          </div>
        </div>
  
        <div className="split right">
          <div className="centered">
            <img src={logo} alt="Logo coronanalyst" className="imgL"/>
            <button className="link">
              <LinkR  to="/">Regresar a inicio</LinkR>
            </button>
          </div>
        </div>
        </div>
      </>
    );
  }

}



export default Login;
