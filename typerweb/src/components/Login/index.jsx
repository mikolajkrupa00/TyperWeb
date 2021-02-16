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
    }, [])

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