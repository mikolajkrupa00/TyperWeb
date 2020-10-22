import React from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../Layout';

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const createUser = (data) => {
    Axios.post('/user/register', data).then((res) => {
      Axios.post('/user/authenticate', { username: data.username, password: data.password }).then((user) => {
        dispatch({ type: 'AUTHENTICATE', payload: user.data }); // obcy reducer
        history.push('/');
      });
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(createUser)}>
        nazwa użytkownika:
      <input ref={register({ required: true, minLength: 4 })} type="text" name="username" placeholder="nazwa użytkownika" />
        {errors['username']?.type === 'required' && <span>pole wymagane</span>}
        {errors['username']?.type === 'minLength' && <span>nazwa użytkownika musi zawierać conajmniej 4 znaki</span>} <br />
      email: <input ref={register({ required: true })} name="email" type="email" placeholder="email" />
        {errors['email']?.type === 'required' && <span>pole wymagane</span>} <br />
      hasło:
      <input
          ref={register({ required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
          name="password"
          type="password"
          placeholder="hasło"
        />
        {errors['password']?.type === 'pattern' && <span>hasło musi zawierać duża,małą literę oraz cyfrę</span>}
        {errors['password']?.type === 'minLength' && <span>hasło musi zawierać minimum 6 znaków</span>}
        {errors['password']?.type === 'required' && <span>pole wymagane</span>}
        <br />
        <button type="submit">zarejestruj się</button>
      </form>
    </Layout>
  );
};

export default RegisterPage;
