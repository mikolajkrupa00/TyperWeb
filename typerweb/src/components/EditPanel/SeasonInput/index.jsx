import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import components from '../styles';

const SeasonInput = ({ season }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: season,
  });
  const dispatch = useDispatch();
  const editPanelState = useSelector((s) => s.editPanelState); // todo dekostruktyzacja
  const { EditButton, EditInput, SeasonButton } = components;

  const saveSeason = (data) => {
    const seasonId = season.seasonId; // todo dekostruktyzacja
    const request = {
      seasonId: +seasonId,
      startYear: +data.startYear,
      endYear: +data.endYear,
    };
    Axios.put('/season', request).then(() => {
      Axios.get('/season').then((res) => dispatch({ type: 'RESET_SEASONS', payload: res.data }, editPanelState)); // edit instead of request
    });
  };

  const setGameweeks = () => {
    const seasonId = season.seasonId; // todo dekostruktyzacja
    !season.isExpanded // todo dekostruktyzacja
      ? Axios.get(`/gameweek/${seasonId}`).then((res) => {
          dispatch({
            type: 'SET_GAMEWEEKS',
            payload: {
              gameweeks: res.data,
              seasonId: seasonId,
            },
          });
        })
      : dispatch({ type: 'BACK_GAMEWEEKS' });
  };

  const editSeason = () => {
    dispatch({ type: 'EDIT_SEASON', payload: season.seasonId });
  };

  const deleteSeason = () => {
    console.log('asd');
    const seasonId = parseInt(season.seasonId);
    Axios.delete(`/season/${seasonId}`).then(() => {
      Axios.get('/season').then((res) => dispatch({ type: 'RESET_SEASONS', payload: res.data }));
    });
  };

  return (
    <div>
      {editPanelState.editedSeason === season.seasonId ? (
        <div key={season.seasonId}>
          <form onSubmit={handleSubmit(saveSeason)}>
            <EditInput type="number" name="startYear" ref={register()} />
            <EditInput type="number" name="endYear" ref={register()} />
            <EditButton type="submit">zapisz</EditButton>
          </form>
        </div>
      ) : (
        <div key={season.seasonId}>
          <SeasonButton onClick={setGameweeks}>
            {`${season.startYear} | `}
            {season.endYear}
          </SeasonButton>
          <EditButton onClick={editSeason}>edytuj</EditButton>
          <EditButton onClick={deleteSeason}>usuń</EditButton>
        </div>
      )}
    </div>
  );
};

export default SeasonInput;
