import React from 'react';
import component from './styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageService } from '../../services/localStorageService';
import { useHistory } from 'react-router-dom';
import NavButton from './NavButton';

const { MainContainer, NavContainer, TopBar, ChildContainer, LayoutContainer, TopBarButton } = component;

const Layout = (props) => {
  const { username, role } = localStorageService;
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((x) => x.layoutState);

  const logOut = () => {
    dispatch({ type: 'LOG_OUT' });
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
          {username ?
            <>
              <NavButton name={username} push="/profile" />
            </> :
            <>
              <NavButton name="Logowanie" push="/login" />
              <NavButton name="Rejestracja" push="/register" />
            </>}
          <NavButton name="Typuj" push="/typer" />
          <NavButton name="Ranking" push="/ranking" />
          <NavButton name="Statystyki" push="/stats" />
          {role === '0' ? <NavButton name="Admin panel" push='/adminPanel' /> : <></>}
          {username && <TopBarButton onClick={() => logOut()}>wyloguj</TopBarButton>}
        </NavContainer>
        <ChildContainer >{props.children}</ChildContainer>
      </MainContainer>
    </LayoutContainer>
  );
};

export default Layout;
