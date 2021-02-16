import styled from 'styled-components';

export default {
    UserContainer: styled.div`
    
    `,
    UserHeader: styled.div`
    font-size:14px;
    color:#9e9e9e;
    `,
    UserInput: styled.input`
    border: 1px solid #bebebe;
    border-radius:3px;
    color:#515151;
    padding-left:5px;
    background:#f5f5f5;
    margin-top:20px;
    font-size:17px;
    margin-bottom:10px;
    display:flex;
    flex-direction:column;
    width:398px;
    height:45px;
    &:active, &:focus{
        outline-color:#aeaeae;
    }
    `,
    UserButton: styled.button`
    display:flex;
    color:#515151;
    margin-left:360px;
    align-items:center;
    justify-Content:flex-end;
    font-size:12px;
    margin-top:5px;
    padding:0;
    height:20px;
    border:0px;
    background:#f5f5f5;
    &:hover{
        border-bottom: 2px solid red;
        margin-bottom: -2px;
        height:22px;
        Cursor:pointer;
    }
    &:active, &:focus{
        outline: none;
    }
    `,
    UserData: styled.div`
    padding-left:5px;
    min-height:40px;
    width:400px;
    margin-top:30px;
    margin-bottom:10px;
    border: 1px solid #bebebe;
    border-radius:3px;
    `,
    UserLabel: styled.div`
    font-size:22px;
    color:#515151;
    `,
    UserSubmit: styled.button`
    background-color:#e90052;
    color:white;
    font-size:14px;
    width:120px;
    height:30px;
    font-weight:500;
    border:1px solid;
    display:flex;
    margin-left:20px;
    justify-content:center;
    align-items:center;
    &:hover {
        cursor:pointer;
    }
    `,
    PasswordHeader: styled.div`
    margin-top:15px;
    margin-bottom:-15px;
    font-size:14px;
    color:#9e9e9e;
    `,
    SubmitContainer: styled.div`
    display:flex;
    flex-direction:row;
    margin-left:-140px;
    margin-top:20px;
    `,
    UserForm: styled.form`
    `,
    InputError: styled.span`
    padding-top:5px;
    padding-bottom:15px;
    color:red;
    width:200%;
    `,
}