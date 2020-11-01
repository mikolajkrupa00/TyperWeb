import styled from 'styled-components';

export default {
    TyperMain: styled.div`
    `,
    TyperTable: styled.div`
    margin-bottom:10px;
    `,
    GameweekData: styled.div`
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
    TyperForm: styled.form`
    `,
    TyperInput: styled.input`
    display:flex;
    text-align: center; 
    width:25px;
    height:25px;
    `,
    MatchData: styled.div`
    border-bottom: 1px solid #E6E6FA;
    display:flex;
    flex-direction:row;
    `,
    HomeTeamName: styled.div`
    padding-right:30px;
    display:flex;
    justify-content:flex-end;
    width:200px;
    align-items:center;
    `,
    AwayTeamName: styled.div`
    padding-left:30px;
    width:200px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    `,
    TyperMatch: styled.div`
    margin-top:10px;
    margin-bottom:10px;
    width:250px;
    display:flex;
    flex-direction:flex-end;
    `,
    MatchResult: styled.div`
    font-size:150%;
    width:50px;
    margin:0;
    display:flex;
    justify-content:center;
    align-items:center;
    `,
    PredictedGoals: styled.div`
    display:flex;
    justify-content:center;
    `,
    MatchDate: styled.div`
    display:flex;
    flex-direction:column;
    `,
    FormSubmit: styled.button`
    background-color:#e90052;
    color:white;
    font-size:16px;
    width:35%;
    height:50px;
    font-weight:500;
    border:1px solid;
    display:flex;
    margin-top:5%;
    margin-right:10%;
    justify-content:center;
    align-items:center;
    &:hover {
        cursor:pointer;
    }
    `,
    TyperMatchCenter: styled.div`
    display:flex;
    width:160px;
    flex-direction:column;
    `,
    TyperInputs: styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    `,
    SubmitContainer: styled.div`
    display:flex;
    justify-content:flex-end;
    `,
    IsSavedBlock: styled.span`
    display:flex;
    width:100%;
    background:#15b271;
    `
}