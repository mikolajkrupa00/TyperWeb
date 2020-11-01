import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { localStorageService } from '../../services/localStorageService';
import components from './styles'
import { useHistory } from 'react-router-dom';

const Typer = () => {
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { gameweeks, matches } = useSelector((x) => x.typerState);
  const { TyperMain, TyperTable, TyperInput, TyperForm, GameweekData, MatchData, HomeTeamName, MatchResult, TyperMatch, PredictedGoals,
    MatchDate, FormSubmit, TyperMatchCenter, AwayTeamName, TyperInputs, SubmitContainer, IsSavedBlock } = components;
  useEffect(() => {
    Axios.get('/gameweek/getCurrentSeasonGameweeks').then((res) => {
      dispatch({ type: 'SET_GAMEWEEKS', payload: res.data });
    }).catch(er => { if (er.response.status === 401) history.push("/login") });
  }, []);

  const setMatches = (gameweekId) => {
    const userId = localStorageService.userId;
    matches[0] && matches[0].gameweekId === gameweekId
      ? dispatch({ type: 'BACK_MATCHES' })
      : Axios.get(`/matchprediction/areGameweekPredictionsExist/${gameweekId}/${userId}`).then((areCreated) => {
        !areCreated.data ?
          Axios.post('/matchprediction/createGameweeksPrediction', { gameweekId: gameweekId, userId: userId })
            .then(x => {
              Axios.get(`/matchprediction/getGameweekPredictionsByUserId/${gameweekId}/${userId}`).then((res) => {
                console.log(res.data)
                dispatch({ type: 'SET_MATCHES', payload: res.data.map((x) => ({ ...x, gameweekId: gameweekId })) });
              });
            }) :
          Axios.get(`/matchprediction/getGameweekPredictionsByUserId/${gameweekId}/${userId}`).then((res) => {
            console.log(res.data)
            dispatch({ type: 'SET_MATCHES', payload: res.data.map((x) => ({ ...x, gameweekId: gameweekId })) });
          });
      });
    setIsSaved(false);
  };

  const saveMatchPrediction = (data) => {
    console.log(data);
    let predictions = matches.filter((x) => new Date(x.matchDate) > new Date())
      .map((match) => ({
        MatchPredictionId: +match.matchPredictionId,
        HomeTeamGoalsPrediction: data[`homeTeam${match.matchPredictionId}`] === "" ? null : +data[`homeTeam${match.matchPredictionId}`],
        AwayTeamGoalsPrediction: data[`awayTeam${match.matchPredictionId}`] === "" ? null : +data[`awayTeam${match.matchPredictionId}`],
      }));
    predictions = predictions.filter(x => x.HomeTeamGoalsPrediction !== null && matches.AwayTeamGoalsPrediction !== null);
    console.log(predictions)
    Axios.put("/matchPrediction/updateMatchPredictions", { predictions: predictions });
    setIsSaved(true);
  };

  return (
    <Layout>
      <TyperMain>
        {gameweeks &&
          gameweeks.map(gameweek => (
            <TyperTable key={gameweek.gameweekId}>
              <GameweekData onClick={() => setMatches(gameweek.gameweekId)}>{`Kolejka ${gameweek.gameweekNumber}`}
              </GameweekData>
              <TyperForm onSubmit={handleSubmit(saveMatchPrediction)}>
                {matches[0] && matches[0].gameweekId === gameweek.gameweekId &&
                  matches.map(match => (
                    <MatchData>
                      <HomeTeamName>{match.homeTeamName}</HomeTeamName>
                      {new Date(match.matchDate) > new Date() ? (
                        <TyperMatch>
                          <MatchResult>{match.homeTeamGoals && match.homeTeamGoals}</MatchResult>
                          <TyperMatchCenter>
                            <TyperInputs>
                              <TyperInput name={`homeTeam${match.matchPredictionId}`}
                                defaultValue={match.homeTeamGoalsPrediction !== null ? match.homeTeamGoalsPrediction : ''}
                                ref={register()} type="text" />
                              <TyperInput name={`awayTeam${match.matchPredictionId}`}
                                defaultValue={match.awayTeamGoalsPrediction !== null ? match.awayTeamGoalsPrediction : ''}
                                ref={register()} type="text" />
                            </TyperInputs>
                            <MatchDate>{match.matchDate}</MatchDate>
                          </TyperMatchCenter>
                          <MatchResult>{match.awayTeamGoals && match.awayTeamGoals}</MatchResult>
                        </TyperMatch>
                      ) : (
                          <TyperMatch>
                            <MatchResult>{match.homeTeamGoals && match.homeTeamGoals}</MatchResult>

                            <TyperMatchCenter>
                              <PredictedGoals>{match.homeTeamGoalsPrediction ? `${match.homeTeamGoalsPrediction} :
                               ${match.awayTeamGoalsPrediction}` : `-:-`}
                              </PredictedGoals>
                              <MatchDate>{match.matchDate}</MatchDate>
                            </TyperMatchCenter>

                            <MatchResult>{match.awayTeamGoals && match.awayTeamGoals}</MatchResult>
                          </TyperMatch>
                        )}

                      <AwayTeamName>{match.awayTeamName}</AwayTeamName>
                    </MatchData>
                  ))}
                {matches.find((x) => new Date(x.matchDate) > new Date() && x.gameweekId === gameweek.gameweekId) && (
                  <>
                    {isSaved && <IsSavedBlock>Zapisano</IsSavedBlock>}
                    <SubmitContainer>
                      <FormSubmit type="submit" value="zapisz">Zapisz</FormSubmit>
                    </SubmitContainer>
                  </>
                )}
              </TyperForm>
            </TyperTable>
          ))}
      </TyperMain>
    </Layout>
  );
};

export default Typer;
