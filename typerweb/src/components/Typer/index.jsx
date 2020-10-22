import React, { useEffect } from 'react';
import Layout from '../Layout';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { localStorageService } from '../../services/localStorageService';
import components from './styles'

const Typer = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { gameweeks, matches } = useSelector((x) => x.typerState);
  const {TyperMain} = components;
  useEffect(() => {
    Axios.get('/gameweek/getCurrentSeasonGameweeks').then((res) => {
      dispatch({ type: 'SET_GAMEWEEKS', payload: res.data }); 
    });
  }, []);

  const setMatches = (gameweekId) => {
    const userId = localStorageService.userId;
    matches[0] && matches[0].gameweekId === gameweekId
      ? dispatch({ type: 'BACK_MATCHES' })
      : Axios.get(`/matchprediction/areGameweekPredictionsExist/${gameweekId}/${userId}`).then((areCreated) => {
        console.log(areCreated.data)
          if (!areCreated.data)
            Axios.get(`/match/getMatchesByGameweekId/${gameweekId}`).then((res) => {
              res.data.map((match) => {
                Axios.post('/matchprediction', {
                  userId: userId,
                  matchId: match.matchId,
                });
              });
            });
          Axios.get(`/matchprediction/getGameweekPredictionsByUserId/${gameweekId}/${userId}`).then((res) => {
            dispatch({ type: 'SET_MATCHES', payload: res.data.map((x) => ({ ...x, gameweekId: gameweekId })) });
          });
        });
  };

  const saveMatchPrediction = (data) => {
    matches
      .filter((x) => new Date(x.matchDate) > new Date())
      .map((match) => {
        const request = {
          matchPredictionId: +match.matchPredictionId,
          HomeTeamGoalsPrediction: +data[`homeTeam${match.matchPredictionId}`],
          AwayTeamGoalsPrediction: +data[`awayTeam${match.matchPredictionId}`],
        };
        Axios.put('/matchprediction', request);
      });
  };

  return (
    <Layout>
      <TyperMain>
        {gameweeks &&
          gameweeks.map((gameweek) => (
            <div key={gameweek.gameweekId}>
              <button onClick={() => setMatches(gameweek.gameweekId)}>{gameweek.gameweekNumber}</button>
              <form onSubmit={handleSubmit(saveMatchPrediction)}>
                {matches[0] &&
                  matches[0].gameweekId === gameweek.gameweekId &&
                  matches.map((match) => (
                    <>
                      {match.homeTeamName}
                      {new Date(match.matchDate) > new Date() ? (
                        <>
                          <input
                            name={`homeTeam${match.matchPredictionId}`}
                            defaultValue={match.homeTeamGoalsPrediction ? match.homeTeamGoalsPrediction : ''}
                            ref={register()}
                          />
                          <input
                            name={`awayTeam${match.matchPredictionId}`}
                            defaultValue={match.awayTeamGoalsPrediction ? match.awayTeamGoalsPrediction : ''}
                            ref={register()}
                          />
                        </>
                      ) : (
                        <>
                          {match.homeTeamGoals} {match.homeTeamGoalsPrediction ? match.homeTeamGoalsPrediction : ''} :{match.awayTeamGoals}{' '}
                          {match.awayTeamGoalsPrediction ? match.awayTeamGoalsPrediction : ''}
                        </>
                      )}
                      {match.awayTeamName} <br />
                    </>
                  ))}
                {matches.find((x) => new Date(x.matchDate) > new Date() && x.gameweekId === gameweek.gameweekId) && (
                  <input type="submit" value="zapisz" />
                )}
              </form>
            </div>
          ))}
      </TyperMain>
    </Layout>
  );
};

export default Typer;
