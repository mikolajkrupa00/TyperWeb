import React from 'react';
import component from './styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { localStorageService } from '../../services/localStorageService';

const { LoginForm, LoginInput, LoginButton, LoginContainer, UserContainer, LayoutContainer } = component;

const Layout = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const state = useSelector((x) => x.layoutState);
  const authenticate = (data) => {
    Axios.post('/user/authenticate', data)
      .then((res) => {
        dispatch({ type: 'AUTHENTICATE', payload: res.data }, state);
        window.location.reload(false);
      })
      .catch((er) => console.log(er));
  };

  const logOut = () => {
    dispatch({ type: 'LOG_OUT' }, state);
    window.location.reload(false);
  };

  return (
    <LayoutContainer>
      {!localStorageService.username && (
        <LoginContainer>
          <LoginForm onSubmit={handleSubmit(authenticate)}>
            login: <LoginInput ref={register()} name="username" type="text" /> <br />
            hasło: <LoginInput ref={register()} name="password" type="password" /> <br />
            <LoginButton type="submit">Zaloguj</LoginButton>
          </LoginForm>
        </LoginContainer>
      )}

      {localStorageService.username && (
        <UserContainer>
          {localStorageService.role && <div>Admin button</div>}
          {localStorageService.username}
          <LoginButton onClick={logOut}>Wyloguj</LoginButton>
        </UserContainer>
      )}

      <div>{props.children}</div>
    </LayoutContainer>
  );
};

export default Layout;
