import React from 'react';
import component from './styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { localStorageService } from '../../services/localStorageService';
import { useHistory } from 'react-router-dom';
import NavButton from './NavButton';

const { MainContainer, NavContainer, TopBar, ChildContainer, LoginForm, LoginInput, LoginButton, LoginContainer,
  UserContainer, LayoutContainer, AdminPanel } = component;

const Layout = (props) => {
  const { username, role } = localStorageService;
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const state = useSelector((x) => x.layoutState);
  const authenticate = (data) => {
    Axios.post('/user/authenticate', data)
      .then((res) => {
        dispatch({ type: 'AUTHENTICATE', payload: res.data });
        window.location.reload(false);
      })
      .catch((er) => console.log(er));
  };

  const logOut = () => {
    dispatch({ type: 'LOG_OUT' }, state);
    history.push("/");
    window.location.reload(false);
  };

  return (
    <LayoutContainer>
      <TopBar>
        Typer Premier League 2020/21
      </TopBar>
      <MainContainer>
        <NavContainer>
          <NavButton name="zaloguj" push="/zaloguj" />
          <NavButton name="zarejestruj" push="/register" /> <br />
          <NavButton name="typuj" push="/typer" />
          <NavButton name="ranking" push="/ranking" />
          <NavButton name="statystyki" push="/stats" /> <br />
          {role === '0' ? <NavButton push='/adminPanel'>admin panel</NavButton> : <></>}
        </NavContainer>
        <ChildContainer >{props.children}</ChildContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout;
