import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../../layout'
import SeasonInput from '../SeasonInput'
import GameweekInput from '../GameweekInput'

const AdminSeasons = () =>{
    const dispatch = useDispatch();
    const adminSeasonsState = useSelector(x => x.adminSeasonsState);

    const seasons = adminSeasonsState.seasons;
    const gameweeks = adminSeasonsState.gameweeks;
    useEffect(() => {
        Axios.get("/season").then(res =>{
            dispatch({type:"SET_SEASONS", payload:res.data}, adminSeasonsState)
        })
    },[])

    return(
        <Layout>
            <div>
                {seasons && seasons.map(season => (
                    <div>
                        <SeasonInput key={season.seasonId} season={season}></SeasonInput>                                  
                        {gameweeks && adminSeasonsState.editedGameweeks===season.seasonId &&
                        gameweeks.map(gameweek =>(
                            <GameweekInput gameweek={gameweek}></GameweekInput>
                        ))}
                    </div>              
                ))}
            </div>
        </Layout>
    )
}

export default AdminSeasons;