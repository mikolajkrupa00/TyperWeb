import React from 'react';
import components from '../styles';
import { useHistory } from 'react-router-dom';

const NavButton = (props) => {
  const { push, name } = props;
  const { MainButtonContainer } = components;
  const history = useHistory();
  return <MainButtonContainer onClick={() => history.push(push)}>{name}</MainButtonContainer>;
};

export default NavButton;
