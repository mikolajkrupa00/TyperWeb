import React, { useEffect } from 'react';
import Layout from '../Layout'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import components from './styles';

const Stats = () => {

    const dispatch = useDispatch();
    const { stats } = useSelector(x => x.statsState)
    const { StatsContainer, StatsRow, ResultData, StatsHeader, Headers, TeamHeader, TeamData, ResultHeader, StatsData, TeamImg } = components;

    useEffect(() => {
        Axios.get('/team/getTeamStats').then(res =>
            dispatch({ type: "SET_STATS", payload: res.data })
        );
    }, [])

    return (
        <Layout>
            <StatsContainer>
                <Headers>
                    <ResultHeader>Poz.</ResultHeader>
                    <TeamHeader>Zespół</TeamHeader>
                    <ResultHeader>M</ResultHeader>
                    <ResultHeader>Z</ResultHeader>
                    <ResultHeader>R</ResultHeader>
                    <ResultHeader>P</ResultHeader>
                    <StatsHeader>Bilans</StatsHeader>
                    <StatsHeader>Punkty</StatsHeader>
                </Headers>
                {stats.map((x, index) =>
                    <StatsRow>
                        <ResultData>{index + 1}</ResultData>
                        <TeamImg src={`${x.teamName}.png`} />
                        <TeamData>{x.teamName}</TeamData>
                        <ResultData>{x.wins + x.draws + x.losses}</ResultData>
                        <ResultData>{x.wins}</ResultData>
                        <ResultData>{x.draws}</ResultData>
                        <ResultData>{x.losses}</ResultData>
                        <StatsData>{x.scoredGoals}:{x.concededGoals}</StatsData>
                        <StatsData>{x.points}</StatsData>
                    </StatsRow>
                )}
            </StatsContainer>
        </Layout>
    )
}

export default Stats;