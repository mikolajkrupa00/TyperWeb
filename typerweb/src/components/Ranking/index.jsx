import Axios from 'axios';
import React, { useEffect } from 'react';
import { localStorageService } from '../../services/localStorageService';
import Layout from '../Layout';
import components from './styles';
import { useDispatch, useSelector } from 'react-redux';

const Ranking = () => {
  const dispatch = useDispatch();
  const { usersPoints } = useSelector((x) => x.rankingState);
  const { RankingContainer } = components;
  useEffect(() => {
    Axios.get(`/user/getUsersPoints`).then((res) => {
      dispatch({ type: 'SET_POINTS', payload: res.data })
    }
    );
  }, []);

  return (
    <Layout>
      <RankingContainer>
        {usersPoints.map(userPoints =>
          <div>
            {userPoints.username}  {userPoints.points}
          </div>

        )}
      </RankingContainer>
    </Layout>
  );
};

export default Ranking;
