import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout';
import SeasonInput from './SeasonInput';
import GameweekInput from './GameweekInput';
import components from './styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { localStorageService } from '../../services/localStorageService';

const EditPanelPage = () => {
  const dispatch = useDispatch();
  const { seasons, gameweeks } = useSelector((x) => x.editPanelState);
  const { EditConainter, EditButton, EditInput } = components;
  const { register: registerSeason, handleSubmit: handleSeasonSubmit, errors: seasonErrors, reset: resetSeason } = useForm();
  const { register: registerGameweek, handleSubmit: handleGameweekSubmit, errors: gameweekErrors, reset: resetGameweek } = useForm();
  const history = useHistory();
  useEffect(() => {
    localStorageService.role !== '0'
      ? history.push('/')
      : Axios.get('/season')
          .then((res) => {
            dispatch({ type: 'SET_ADMIN_SEASONS', payload: res.data });
          })
          .catch((er) => console.log(er.response));
  }, []);

  const saveSeason = ({ startYear, endYear }) => {
    const request = {
      startYear: +startYear,
      endYear: +endYear,
    };
    Axios.post('/season', request).then((res) => {
      dispatch({ type: 'ADD_SEASON', payload: { ...request, seasonId: res.data } }); // todo
    });
    resetSeason(['startYear', 'endYear']);
  };

  const saveGameweek = ({ seasonId, gameweekNumber }) => {
    const request = {
      seasonId: +seasonId,
      gameweekNumber: +gameweekNumber,
    };
    Axios.post('/gameweek', request).then((res) => {
      dispatch({ type: 'ADD_GAMEWEEK', payload: { gameweekNumber: gameweekNumber, gameweekId: res.data } });
    });
    resetGameweek(['gameweekNumber']);
  };
  return (
    <Layout>
      <EditConainter>
        {seasons &&
          seasons.map((season) => (
            <div key={season.seasonId}>
              <SeasonInput key={season.seasonId} season={season}></SeasonInput>
              {gameweeks && season.isExpanded && (
                <div>
                  {gameweeks.map((gameweek) => (
                    <div>
                      <GameweekInput gameweek={gameweek}></GameweekInput>
                    </div>
                  ))}
                  <form onSubmit={handleGameweekSubmit(saveGameweek)}>
                    <EditInput type="number" name="gameweekNumber" ref={registerGameweek({ required: true, min: 1, max: 50 })} />
                    {gameweekErrors['gameweekNumber']?.type === 'required' && <span>pole wymagane</span>}
                    {gameweekErrors['gameweekNumber']?.type === 'min' && <span>zbyt duża wartość</span>}
                    {gameweekErrors['gameweekNumber']?.type === 'max' && <span>zbyt mała wartość</span>}
                    <EditInput value={season.seasonId} type="hidden" name="seasonId" ref={registerGameweek()} />
                    <EditButton type="submit">dodaj</EditButton>
                  </form>
                </div>
              )}
            </div>
          ))}

        <form onSubmit={handleSeasonSubmit(saveSeason)}>
          <EditInput type="number" name="startYear" ref={registerSeason({ required: true, min: 2000, max: 2030 })} />
          {seasonErrors['startYear']?.type === 'required' && <span>pole jest wymagane </span>}
          {seasonErrors['startYear']?.type === 'min' && <span>zbyt mała wartość </span>}
          {seasonErrors['startYear']?.type === 'max' && <span>zbyt duża wartość </span>}

          <EditInput type="number" name="endYear" ref={registerSeason({ required: true, min: 2000, max: 2030 })} />
          {seasonErrors['endYear']?.type === 'required' && <span>pole jest wymagane </span>}
          {seasonErrors['endYear']?.type === 'min' && <span>zbyt mała wartość </span>}
          {seasonErrors['endYear']?.type === 'max' && <span>zbyt duża wartość </span>}
          <EditButton type="submit">dodaj</EditButton>
        </form>
        <EditButton onClick={() => history.push('/editTeams')}>edytuj zespoły</EditButton>
      </EditConainter>
    </Layout>
  );
};

export default EditPanelPage;
