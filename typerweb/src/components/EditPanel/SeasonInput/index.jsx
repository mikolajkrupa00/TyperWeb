import React, {useState} from 'react';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from "react-hook-form";

const SeasonInput=(props) =>
{
    const[startYear, setStartYear] = useState(0);
    const[endYear, setEndYear] = useState(0);
    const{register, handleSubmit} = useForm();
    const{season} = props;
    const dispatch = useDispatch();
    const editPanelState = useSelector(s => s.editPanelState);

    const setFormValue = e =>{
        e.target.name==="startYear" ? setStartYear(e.target.value):
        setEndYear(e.target.value)
    }

    const saveSeason = data =>{
        const seasonId = season.seasonId;
        const request = {
            seasonId:parseInt(seasonId), 
            startYear:parseInt(data.startYear),
            endYear:parseInt(data.endYear)
        };
        Axios.put("/season", request).then(() =>{
            Axios.get("/season").then(res =>
            dispatch({type:"RESET_SEASONS", payload:res.data}, editPanelState)) // edit instead request
        })
    }

    const setGameweeks = () =>{
        const seasonId = season.seasonId;
        editPanelState.editedGameweeks!==seasonId ? 
            Axios.get(`/gameweek/${seasonId}`).then(res =>{
                dispatch({type:"SET_GAMEWEEKS", payload:{
                    gameweeks:res.data,
                    seasonId:seasonId
                }}, editPanelState)
            }):
            dispatch({type:"BACK_GAMEWEEKS"}, editPanelState)
    }

    const editSeason = () =>{
        dispatch({type:"EDIT_SEASON", payload:season.seasonId}, editPanelState)
        setStartYear(season.startYear)
        setEndYear(season.endYear)
    }
    return(
        <div>
            { editPanelState.editedSeason === season.seasonId ? 
                <div key={season.seasonId}>
                    <form onSubmit={handleSubmit(saveSeason)}>
                        <input onChange={setFormValue} type="number" value={startYear} name="startYear" ref={register()}/>
                        <input onChange={setFormValue} type="number" value={endYear} name="endYear" ref={register()}/>
                        <button type="submit">zapisz</button>
                    </form>
                </div> :

                <div key={season.seasonId}>
                    <button onClick={setGameweeks}>
                        {season.startYear}  {season.endYear}
                    </button>
                    <button onClick={editSeason}>edytuj</button>
            </div>  
            }   
        </div>   
    )

}

export default SeasonInput;