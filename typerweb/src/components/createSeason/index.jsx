import React, { useEffect } from 'react';
import components from './styles';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import Layout from '../layout/index';
import {localStorageService} from '../../services/localStorageService';



const CreateSeason = () =>
{
    const {register, handleSubmit} = useForm();
    const {FormMain, FormInput, FormButton} = components;
    //const dispatch = useDispatch();
    const createSeason = (data) =>
    {
        Axios.get("/season").then(res => console.log(res.data));
        // Axios.post(`${process.env.REACT_APP_API_BASE_URL}/season`, data).then(res =>{
        //     dispatch({ type: "ADD_SEASON", payload:data });
        // });
    }

    return(
        <Layout>
            <div>
                {/* <FormMain onSubmit={handleSubmit(createSeason)}>
                    start year: <FormInput type="number" name="startYear" ref={register()}/> <br/>
                    end year: <FormInput type="number" name="endYear" ref={register()}/> <br/>
                    <FormButton type="submit">Dodaj</FormButton>
                </FormMain> */}
            </div>
        </Layout>
    );
}

export default CreateSeason;