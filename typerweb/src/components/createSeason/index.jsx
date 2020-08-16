import React, { useEffect } from 'react';
import components from './styles';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from 'axios';



const CreateSeason = () =>
{
    const {register, handleSubmit} = useForm();
    const {FormMain, FormInput, FormButton} = components;
    //const dispatch = useDispatch();

    const createSeason = (data) =>
    {   
        Axios.get(`/season`, {}, { headers: {
            'dataType': 'json',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8' 
          }}).then(res => console.log(res.data)).catch(err => console.log(err));
        // Axios.post(`${process.env.REACT_APP_API_BASE_URL}/season`, data).then(res =>{
        //     dispatch({ type: "ADD_SEASON", payload:data });
        // });
    }

    return(
        <FormMain onSubmit={handleSubmit(createSeason)}>
            start year: <FormInput type="number" name="startYear" ref={register()}/> <br/>
            end year: <FormInput type="number" name="endYear" ref={register()}/> <br/>
            <FormButton type="submit">Dodaj</FormButton>
        </FormMain>
    );
}

export default CreateSeason;