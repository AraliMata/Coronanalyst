import React, { createContext,Component } from "react";
import axios from 'axios'
export const MyContext = createContext();

// Create Axios instance and define the base URL
const Axios = axios.create({
    baseURL: 'http://localhost/coronanalyst/api/'
});

class MyContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
        //this.hasProfile();
    }

    // Root State
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null,
        profile:false,
        survey:false
    }
    
    // Toggle between Login & Signup page
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }

    registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('register.php',{
            email:user.email,
            password:user.password 
        });
        console.log(register.data);
        return register.data;
    }

    createProfile = async (user) =>{
        const profile = await Axios.post('datos-personales.php',{
            genero:user.genero,
            edad:user.edad,
            estadocivil:user.estadocivil,
            estudios:user.estudios,
            ocupacion:user.ocupacion,
            ingreso_economico:user.ingreso_economico,
            estado:user.estadocivil,
            id_user:user.id_user
        });
        console.log(profile.data);
        return profile.data;
    }


    loginUser = async (user) => {
        // Sending the user Login request
        console.log("Starting request");
        try {
            //Axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
            //Axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
            const login = await Axios.post('login.php',{
                email:user.email,
                password:user.password
            });
            console.log("Completed");
            console.log(login.data);
            return login.data;
        }
        catch (error) {
            console.log(Object.keys(error), error.message);
        }
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        console.log("checking for token");
        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if(loginToken){
            console.log("Token is present");

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;

            // Fetching the user information
            const {data} = await Axios.get('user-info.php');

            // If user information is successfully received
            if(data.success && data.user){
                if(data.hasProfile){
                    if(data.completedSurvey){
                        console.log("User, profile data, and survey completion successfully retrieved");
                        this.setState({
                            ...this.state,
                            isAuth:true,
                            theUser:data.user,
                            profile:true,
                            survey:true
                        });
                    }
                    else{
                        console.log("User and profile data successfully retrieved");
                        this.setState({
                            ...this.state,
                            isAuth:true,
                            theUser:data.user,
                            profile:true
                        });
                    }
                }
                else{
                    console.log("User data successfully retrieved");
                    this.setState({
                        ...this.state,
                        isAuth:true,
                        theUser:data.user
                    });
                }
            }
            else if(data.message){
                console.log(data.message)
            }
        }
    }

    // Checking if user has completed their profile
/*     hasProfile = async () => {
        console.log("Checking for user profile");
        // Fetching the user information
        const {data} = await Axios.get('user-profile.php');

        // If user information is successfully received
        if(data.success && data.hasProfile){
            console.log("Data successfully retrieved:");
            this.setState({
                ...this.state,
                profile:true
            });
            //console.log(this.state.profile);
        }
        else if(data.message){
            console.log(data.message)
        }
    } */

    render(){
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            //hasProfile:this.hasProfile,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser,
            createProfile:this.createProfile
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;