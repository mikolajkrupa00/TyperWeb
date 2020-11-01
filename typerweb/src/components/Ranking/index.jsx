import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { localStorageService } from '../../services/localStorageService';
import Layout from '../Layout';
import components from './styles';
import { useDispatch, useSelector } from 'react-redux';

const Ranking = () => {
  const dispatch = useDispatch();
  const { usersPoints } = useSelector((x) => x.rankingState);
  const { RankingContainer, RankingRow, RowData, RankingHeader, Headers, PositionData, PositionHeader, PointsHeader, PointsData,
    UsernameHeader, UsernameData } = components;
  useEffect(() => {

    Axios.get(`/user/getUsersPoints`).then((res) => {
      dispatch({ type: 'SET_POINTS', payload: res.data })
      console.log(res.data)
    }
    );
  }, []);

  return (
    <Layout>
      <RankingContainer>
        <Headers>
          <PositionHeader>Pozycja</PositionHeader>
          <UsernameHeader>Użytkownik</UsernameHeader>
          <RankingHeader>Dokładne</RankingHeader>
          <RankingHeader>Zwycięzca</RankingHeader>
          <RankingHeader>Nietrafione</RankingHeader>
          <PointsHeader>Punkty</PointsHeader>
        </Headers>
        {usersPoints.map((userPoints, index) =>
          <RankingRow isEven={index % 2 ? "#f5f5f5" : "white"}>
            <PositionData>{index + 1} </PositionData>
            <UsernameData>{userPoints.username} </UsernameData>
            <RowData>{userPoints.exactPredictions}</RowData>
            <RowData>{userPoints.winnerPredictions}</RowData>
            <RowData>{userPoints.incorrectPredictions} </RowData>
            <PointsData>{userPoints.points}  </PointsData>
          </RankingRow>

        )}
      </RankingContainer>
    </Layout>
  );
};

export default Ranking;
