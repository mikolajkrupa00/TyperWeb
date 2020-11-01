import React from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../Layout';
import components from './styles';

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { FormLabel, FormInput, FormMain, RegisterMain, FormSubmit, InputError } = components;

  const createUser = (data) => {
    Axios.post('/user/register', data).then((res) => {
      Axios.post('/user/authenticate', { username: data.username, password: data.password }).then((user) => {
        dispatch({ type: 'AUTHENTICATE', payload: user.data }); // obcy reducer
        history.push('/');
      });
    })
      .catch((error) => {
        console.log(JSON.stringify(error));
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        console.log(error.request);
        console.log('Error', error.message);
        console.log(error.config);
      });;
  };

  return (
    <Layout>
      <RegisterMain>
        <FormMain onSubmit={handleSubmit(createUser)}>
          <FormLabel>Nazwa użytkownika</FormLabel>
          <FormInput ref={register({ required: true, minLength: 4 })} type="text" name="username" placeholder="nazwa użytkownika" />
          {errors['username']?.type === 'required' && <InputError>pole wymagane</InputError>}
          {errors['username']?.type === 'minLength' && <InputError>nazwa użytkownika musi zawierać conajmniej 4 znaki</InputError>}

          <FormLabel>Email</FormLabel>
          <FormInput ref={register({ required: true })} name="email" type="email" placeholder="email" />
          {errors['email']?.type === 'required' && <InputError>pole wymagane</InputError>}

          <FormLabel>Hasło</FormLabel>
          <FormInput
            ref={register({ required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
            name="password"
            type="password"
            placeholder="hasło"
          />
          {errors['password']?.type === 'pattern' && <InputError>hasło musi zawierać duża,małą literę oraz cyfrę</InputError>}
          {errors['password']?.type === 'minLength' && <InputError>hasło musi zawierać minimum 6 znaków</InputError>}
          {errors['password']?.type === 'required' && <InputError>pole wymagane</InputError>}
          <FormSubmit type="submit">zarejestruj się</FormSubmit>
        </FormMain>
      </RegisterMain>
    </Layout>
  );
};

export default RegisterPage;
