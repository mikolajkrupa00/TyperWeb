import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from "react-hook-form";
import Layout from '../../components/layout'

const AdminSeasons = () =>{
    const dispatch = useDispatch();
    const adminSeasonsState = useSelector(x => x.adminSeasonsState);
    const {register, handleSubmit} = useForm();

    const editSeason = data =>{
        dispatch({type:"EDIT_SEASON", payload:data.idx}, adminSeasonsState);
        setStartYear(data.startYear)
        setEndYear(data.endYear)
    }
    const saveSeason = data =>{
        const request = {
            seasonId:parseInt(data.seasonId), 
            startYear:parseInt(data.startYear),
            endYear:parseInt(data.endYear)
        };
        Axios.post("/season/edit", request).then(()=>{
            Axios.get("/season").then(res =>
            dispatch({type:"RESET_SEASONS", payload:res.data}, adminSeasonsState))
        });
    }

    const [startYear, setStartYear] = useState();
    const [endYear, setEndYear] = useState();

    const setFormValue = e =>{
        e.target.name==="startYear" ? setStartYear(e.target.value):
        setEndYear(e.target.value)
    }

    const seasons = adminSeasonsState.seasons;
    useEffect(() => {
        Axios.get("/season").then(res =>{
            dispatch({type:"SET_SEASONS", payload:res.data}, adminSeasonsState)
        })
    },[])

    return(
        <Layout>
            <div>
                {seasons && seasons.map((season, idx) => (
                adminSeasonsState.editedSeason===idx ? 
                    <div key={idx}>
                        <form onSubmit={handleSubmit(saveSeason)}>
                            <input onChange={setFormValue} value={startYear} name="startYear" type="number" ref={register()}/>
                            <input onChange={setFormValue} value={endYear} name="endYear" type="number" ref={register()}/>
                            <input type="hidden" name="seasonId" value={season.seasonId} ref={register()}/>
                            <button type="submit">zapisz</button>
                        </form>
                    </div> :
                    <div key={idx}>
                        {season.startYear}, {season.endYear}
                        <button onClick={() => editSeason({idx, startYear:season.startYear, endYear:season.endYear})}>edytuj</button> <br/>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default AdminSeasons;