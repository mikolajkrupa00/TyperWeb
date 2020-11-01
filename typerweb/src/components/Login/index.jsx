import React, { useState, useEffect } from 'react';
import Layout from '../Layout'
import components from './styles'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const { LoginMain, FormMain, FormInput, FormSubmit, FormLabel, IncorrectLogin } = components;
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [incorrectData, setIncorrectData] = useState(false);
    const history = useHistory();

    useEffect(() => {



        Axios({
            "method": "GET",
            "url": "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/2/last/10",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "3329bdd7c9msh0ff4ee6560ca4a2p1c2db4jsn0b0adafa96df",
                "useQueryString": true
            }
        })
            .then((response) => {
                console.log(response.data.api.fixtures)
            })
            .catch((error) => {
                console.log(error)
            })

    })

    const authenticate = (data) => {
        Axios.post('/user/authenticate', data)
            .then((res) => {
                dispatch({ type: 'AUTHENTICATE', payload: res.data });
                history.push("/");
                window.location.reload(false);
            })
            .catch((er) => setIncorrectData(true));
    }

    return (
        <Layout>
            <LoginMain>
                <FormMain onSubmit={handleSubmit(authenticate)}>
                    <FormLabel>Nazwa użytkownika</FormLabel>
                    <FormInput type="text" placeholder="nazwa użytkownika" name="username" ref={register()} />
                    <FormLabel>Hasło</FormLabel>
                    <FormInput type="password" placeholder="hasło" name="password" ref={register()} />
                    <IncorrectLogin display={incorrectData ? true : false}>niepoprawne dane</IncorrectLogin>
                    <FormSubmit type="submit">Zaloguj</FormSubmit>
                </FormMain>
            </LoginMain>
        </Layout>
    )

}

export default Login;