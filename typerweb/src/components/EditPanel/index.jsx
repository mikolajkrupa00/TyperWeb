import React, { useEffect, useState } from 'react';
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
  const [isGameweekCreating, setIsGameweekCreating] = useState(false);
  const [isSeasonCreating, setIsSeasonCreating] = useState(false);
  const { EditConainter, EditButton, EditInput, CreateForm, InputError, SaveButton, SubmitButtons } = components;
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
    setIsSeasonCreating(false);
  };

  const saveGameweek = ({ seasonId, gameweekNumber }) => {
    const request = {
      seasonId: seasonId,
      gameweekNumber: +gameweekNumber,
    };
    console.log(request);
    Axios.post('/gameweek', request).then((res) => {
      dispatch({ type: 'ADD_GAMEWEEK', payload: { gameweekNumber: +gameweekNumber, gameweekId: res.data } });
    }).catch(er => console.log(er));
    resetGameweek(['gameweekNumber']);
  };

  const updateSeason = () => {
    Axios.put('/season/updateSeason', {});
  }

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
                </div>
              )}
            </div>
          ))}
        {isSeasonCreating &&
          <CreateForm onSubmit={handleSeasonSubmit(saveSeason)}>
            <EditInput placeholder="rok startowy" type="number" name="startYear" ref={registerSeason({ required: true, min: 2001, max: 2030 })} />
            {seasonErrors['startYear']?.type === 'required' && <InputError>pole jest wymagane </InputError>}
            {seasonErrors['startYear']?.type === 'min' && <InputError>zbyt mała wartość </InputError>}
            {seasonErrors['startYear']?.type === 'max' && <InputError>zbyt duża wartość </InputError>}

            <EditInput placeholder="rok końcowy" type="number" name="endYear" ref={registerSeason({ required: true, min: 2001, max: 2030 })} />
            {seasonErrors['endYear']?.type === 'required' && <InputError>pole jest wymagane </InputError>}
            {seasonErrors['endYear']?.type === 'min' && <InputError>zbyt mała wartość </InputError>}
            {seasonErrors['endYear']?.type === 'max' && <InputError>zbyt duża wartość </InputError>}
            <SubmitButtons>
              <SaveButton onClick={() => setIsSeasonCreating(false)}>anuluj</SaveButton>
              <SaveButton type="submit">dodaj</SaveButton>
            </SubmitButtons>
          </CreateForm>
        }
        {seasons && !seasons.find(season => season.isExpanded) && <EditButton onClick={() => setIsSeasonCreating(true)}>dodaj nowy sezon</EditButton>}
        {seasons && seasons.find(season => season.isExpanded) && !isGameweekCreating &&
          <EditButton onClick={() => setIsGameweekCreating(true)}>dodaj nową kolejkę</EditButton>
        }
        {isGameweekCreating && seasons.find(x => x.isExpanded) &&

          <CreateForm onSubmit={handleGameweekSubmit(saveGameweek)}>
            <EditInput placeholder="numer kolejki" type="number" name="gameweekNumber" ref={registerGameweek({ required: true, min: 1, max: 50 })} />
            {gameweekErrors['gameweekNumber']?.type === 'required' && <InputError>pole wymagane</InputError>}
            {gameweekErrors['gameweekNumber']?.type === 'min' && <InputError>zbyt mała wartość</InputError>}
            {gameweekErrors['gameweekNumber']?.type === 'max' && <InputError>zbyt duża wartość</InputError>}
            <EditInput value={seasons.find(x => x.isExpanded).seasonId} type="hidden" name="seasonId" ref={registerGameweek()} />
            <SubmitButtons>
              <SaveButton onClick={() => setIsGameweekCreating(false)}>anuluj</SaveButton>
              <SaveButton type="submit">dodaj</SaveButton>
            </SubmitButtons>
          </CreateForm>
        }
        <EditButton onClick={() => history.push('/editTeams')}>edytuj zespoły</EditButton>
        <EditButton onClick={() => updateSeason()}>Aktualizuj bierzący sezon</EditButton>
      </EditConainter>
    </Layout>
  );
};

export default EditPanelPage;
