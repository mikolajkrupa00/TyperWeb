import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layout';
import SeasonInput from './SeasonInput';
import GameweekInput from './GameweekInput';
import components from './styles';
import { useForm } from 'react-hook-form';

const EditPanel = () => {
  const dispatch = useDispatch();
  const { seasons, gameweeks, addSeason, addGameweek } = useSelector((x) => x.editPanelState);
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);

  const { EditConainter, EditButton, EditInput, AddButton } = components;
  // const seasons = editPanelState.seasons;
  // const gameweeks = editPanelState.gameweeks;
  useEffect(() => {
    Axios.get('/season').then((res) => {
      dispatch({ type: 'SET_SEASONS', payload: res.data });
    });
  }, []);

  const saveSeason = (data) => {
    const request = {
      startYear: +data.startYear,
      endYear: +data.endYear,
    };
    Axios.post('/season', request).then(() => {
      Axios.get('/season').then((res) => {
        dispatch({ type: 'RESET_SEASONS', payload: res.data }); // todo
      });
    });
  };

  const saveGameweek = ({ seasonId, gameweekNumber }) => {
    const request = {
      seasonId: +seasonId,
      gameweekNumber: +gameweekNumber,
    };
    const url = `/gameweek/${seasonId}`;
    Axios.post('/gameweek', request).then(() => {
      // zwraca obiekt
      Axios.get(url).then((res) => {
        dispatch({ type: 'RESET_GAMEWEEKS', payload: res.data }); //todo
      });
    });
  };

  return (
    <Layout>
      <EditConainter>
        {addSeason && ( // addSeason useState()
          <form onSubmit={handleSubmit(saveSeason)}>
            <EditInput
              type="number"
              name="startYear"
              ref={register({
                required: true,
              })}
            />
            <EditInput
              type="number"
              name="endYear"
              ref={register({
                required: true,
              })}
            />
            {errors['endYear'] && errors['endYear'].type === 'required' && <span>pole jest wymagane </span>}
            {/* todo error message component */}
            <EditButton type="submit">zapisz</EditButton>
          </form>
        )}
        {!addSeason && <AddButton onClick={() => dispatch({ type: 'ADD_SEASON' })}>dodaj</AddButton>}

        {seasons &&
          seasons.map((season) => (
            <div key={season.seasonId}>
              <SeasonInput key={season.seasonId} season={season}></SeasonInput>
              <div>
                {gameweeks &&
                  season.isExpanded && //todo
                  !addGameweek && <AddButton onClick={() => dispatch({ type: 'ADD_GAMEWEEK' })}>dodaj</AddButton>}

                {gameweeks && season.isExpanded && addGameweek && (
                  <form onSubmit={handleSubmit(saveGameweek)}>
                    <EditInput type="number" name="gameweekNumber" ref={register()} />
                    <EditInput value={season.seasonId} type="hidden" name="seasonId" ref={register()} />
                    <EditButton type="submit">zapisz</EditButton>
                  </form>
                )}

                {gameweeks &&
                  season.isExpanded &&
                  gameweeks.map((gameweek) => (
                    <div>
                      <GameweekInput gameweek={gameweek}></GameweekInput>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </EditConainter>
    </Layout>
  );
};

export default EditPanel;
