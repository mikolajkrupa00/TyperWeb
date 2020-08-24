import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../layout'
import SeasonInput from './SeasonInput'
import GameweekInput from './GameweekInput'

const EditPanel = () =>{
    const dispatch = useDispatch();
    const editPanelState = useSelector(x => x.editPanelState);

    const seasons = editPanelState.seasons;
    const gameweeks = editPanelState.gameweeks;
    useEffect(() => {
        Axios.get("/season").then(res =>{
            dispatch({type:"SET_SEASONS", payload:res.data}, editPanelState)
        })
    },[])

    return(
        <Layout>
            <div>
                {seasons && seasons.map(season => (
                    <div>
                        <SeasonInput key={season.seasonId} season={season}></SeasonInput>                                  
                        {gameweeks && editPanelState.editedGameweeks===season.seasonId &&
                        gameweeks.map(gameweek =>(
                            <GameweekInput gameweek={gameweek}></GameweekInput>
                        ))}
                    </div>              
                ))}
            </div>
        </Layout>
    )
}

export default EditPanel;