import React from 'react';
import component from './styles';
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios'
import {localStorageService} from '../../services/localStorageService'

const {FormMain, FormInput, FormButton} = component;

const Layout = (props) =>
{

    const{register, handleSubmit}= useForm();
    const dispatch = useDispatch();
    const state = useSelector(x => x.layoutState);
    const authenticate = (data) =>{
        Axios.post("/user/authenticate", data).then(res =>{
            dispatch({ type: "AUTHENTICATE", payload:res.data }, state);
            console.log(localStorageService.username)
            console.log(localStorageService.role)
            console.log(localStorageService.token)
            window.location.reload(false);
        }).catch(er => console.log(er));
    }

    const logOut = () =>{
        dispatch({type:"LOG_OUT"}, state);
        window.location.reload(false);
    }

    return(
        <div>
            {localStorageService.role===0 && <div>Admin button</div>}
            {!localStorageService.username && 
            <FormMain onSubmit={handleSubmit(authenticate)}>
            login: <FormInput ref={register()} name="username" type="text"/> <br/>
            hasło: <FormInput ref={register()} name="password" type="password"/> <br/>
            <FormButton type="submit">Zaloguj</FormButton>
            </FormMain>}

            {localStorageService.username &&
            <div>{localStorageService.username} 
            <FormButton onClick={logOut}>Wyloguj</FormButton>
            </div>}
        
        <div>
        {props.children}
        </div>
        </div>
    )
}

export default Layout;