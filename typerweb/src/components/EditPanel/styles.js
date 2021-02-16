import styled from 'styled-components';

export default {
  EditButton: styled.button`
  height:30px;
  margin-left:5px;
  `,
  EditInput: styled.input`
  height:35px;
  width:200px;
  margin-bottom:5px;
  `,
  EditConainter: styled.div`
  min-height:800px;
  `,
  SeasonButton: styled.button`
  margin-bottom:10px;
  font-weight:500;
    border:2px solid #E6E6FA;
    border-radius: 5px;
    height:30px;
    width:710px;
    display:flex;
    padding-left:10px;
    align-items:center;
    font-size:20px;
    &:hover {
        cursor:pointer;
    }
  `,
  GameweekButton: styled.button`
  font-weight:500;
    border:2px solid #E6E6FA;
    border-radius: 5px;
    height:30px;
    width:510px;
    display:flex;
    padding-left:10px;
    align-items:center;
    font-size:20px;
    &:hover {
        cursor:pointer;
    }
  `,
  SaveButton: styled.button`
  display:flex;
  height:25px;
  width:50px;
  align-items:center;
  margin-top:5px;
  margin-right:5px;
  `,
  SelectContainer: styled.div`
  width:500px;
  margin-bottom:10px;
  `,
  EditMatchRow: styled.div`
  margin-bottom:15px;
  margin-top:15px;
  display:flex;
  align-items:center;
  height:30px;
  background:#fbfbfb;
  display:flex;
  flex-direction:row;
  `,
  HomeTeam: styled.div`
  padding-right:15px;
  width:200px;
  display:flex;
  justify-content:flex-end;
  `,
  AwayTeam: styled.div`
  padding-left:15px;
  width:200px;
  `,
  SeasonContainer: styled.div`
  display:flex;
  flex-direction:row;
  margin-bottom:10px;
  `,
  GameweekContainer: styled.div`
  display:flex;
  flex-direction:row;
  margin-bottom:10px;
  `,
  CreateForm: styled.form`
  width:200px;
  margin-top:10px;
  margin-bottom:10px;
  display:flex;
  flex-direction:column;
  `,
  InputError: styled.span`
  padding-top:5px;
  padding-bottom:15px;
  color:red;
  width:200%;
  `,
  SubmitButtons: styled.div`
  display:flex;
  margin-left:103px;
  flex-direction:row;
  `,
  EditSubmit: styled.button`
  display:flex;
  height:25px;
  width:50px;
  align-items:center;
  margin-top:5px;
  margin-right:5px;
  margin-left:160px;
  `,
  TeamData: styled.div`
  margin-bottom:10px;
  font-weight:500;
    border:2px solid #E6E6FA;
    border-radius: 5px;
    height:30px;
    width:710px;
    display:flex;
    padding-left:5px;
    align-items:center;
    font-size:20px;
  `,
  TeamsContainer: styled.div`
  display:flex;
  flex-direction:row;
  `,
  TeamInput: styled.input`
  
  height:35px;
  width:400px;
  margin-bottom:5px;
  `,
  AddTeamButton: styled.button`
  height:30px;
  margin-left:10px;
  width:100px;
  `,
  TeamRow: styled.div`
  `,
  MatchDate: styled.div`
  width:200px;
  margin-left:10px;
  `,
  MatchResult: styled.div`
  width:150px;
  display:flex;
  justify-content:center;
  `,
  EditMatchForm: styled.form`
  display:flex;
  flex-direction:row;
  `,
  EditMatchInput: styled.input`
  display:flex;
  text-align:center;
  width:33px;
  margin-left:15px;
  margin-right:15px;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }`,
  ImgDiv: styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  `,
  TeamImg: styled.img`
  width:25px;
  height:25px;
  `,
};
