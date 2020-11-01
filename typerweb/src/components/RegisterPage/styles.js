import styled from 'styled-components';

export default {
    FormLabel: styled.label`
    font-weight:500;
    display:flex;
    justify-content:flex-start;
    width:210%;
    padding-bottom:5%;
    `,
    FormInput: styled.input`
    margin-bottom:5%;
    height:200%;
    padding:5%;
    width:200%;
    `,
    FormMain: styled.form`
    width:200px;
    max-width:200px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    `,
    RegisterMain: styled.div``,
    FormSubmit: styled.button`
    font-weight:500;
    height:30px;
    border:1px solid;
    margin-left:-160%;
    width:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:15%;
    &:hover {
        cursor:pointer;
    }
    `,
    InputError: styled.span`
    padding-top:5px;
    padding-bottom:15px;
    color:red;
    width:200%;
    `
}