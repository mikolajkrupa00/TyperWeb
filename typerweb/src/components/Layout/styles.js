import styled from 'styled-components';

export default {
  LoginForm: styled.form``,
  LoginInput: styled.input``,
  LoginButton: styled.button`
  `,
  LoginContainer: styled.div`
  `,
  UserContainer: styled.div`
  `,
  LayoutContainer: styled.div`
  `,
  MainButtonContainer: styled.div`
  font-size:95%;
  padding:2%;
  &:hover {
    color:#9370DB;
    cursor:pointer;
  }
  `,
  TopBar: styled.div`
  background-color:#8A2BE2;
  width:100%;
  color: #ccfc5a;
  height:120px;
  font-size:40px;
  display:flex;
  justify-Content:center;
  align-items:center;
  `,
  ChildContainer: styled.div`
  `,
  AdminPanel: styled.div`
  `,
  NavContainer: styled.div`
  display:flex;
  flex-direction:row;
  margin-top:-0;
  width:90%;
  border-bottom: 2px solid #E6E6FA;
  `,
  MainContainer: styled.div`
  display:flex;
  flex-direction:column;
  border:1px solid #E6E6FA;
  align-items:center;
  height:auto;
  margin-left:10%;
  margin-right:10%;
  margin-top:2%;
  `
};
