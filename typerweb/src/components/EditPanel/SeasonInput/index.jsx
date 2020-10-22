import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import components from '../styles';

const SeasonInput = ({ season }) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { EditButton, EditInput, SeasonButton } = components;

  const saveSeason = (data) => {
    const seasonId = season.seasonId; // todo dekostruktyzacja
    const request = {
      seasonId: +seasonId,
      startYear: +data.startYear,
      endYear: +data.endYear,
    };
    Axios.put('/season', request).then((res) => {
      dispatch({ type: 'EDIT_SEASON', payload: request });
    });
  };

  const setGameweeks = () => {
    const seasonId = season.seasonId; // todo dekostruktyzacja
    !season.isExpanded // todo dekostruktyzacja
      ? Axios.get(`/gameweek/getGameweeksBySeasonId/${seasonId}`).then((res) => {
          dispatch({
            type: 'SET_ADMIN_GAMEWEEKS',
            payload: {
              gameweeks: res.data,
              seasonId: seasonId,
            },
          });
        })
      : dispatch({ type: 'BACK_GAMEWEEKS' });
  };

  const deleteSeason = () => {
    const seasonId = +season.seasonId;
    Axios.delete(`/season/${seasonId}`).then(() => {
      dispatch({ type: 'DELETE_SEASON', payload: seasonId });
    });
  };

  const setSeasonEditInput = (id) => {
    dispatch({ type: 'SET_SEASON_EDIT_INPUT', payload: id });
  };

  return (
    <div>
      {season.isEdited ? (
        <div key={season.seasonId}>
          <form onSubmit={handleSubmit(saveSeason)}>
            <EditInput
              defaultValue={season.startYear}
              type="number"
              name="startYear"
              ref={register({ required: true, min: 2000, max: 2030 })}
            />
            {errors['startYear']?.type === 'required' && <span>pole jest wymagane </span>}
            {errors['startYear']?.type === 'min' && <span>zbyt mała wartość </span>}
            {errors['startYear']?.type === 'max' && <span>zbyt duża wartość </span>}
            <EditInput
              defaultValue={season.endYear}
              type="number"
              name="endYear"
              ref={register({ required: true, min: 2000, max: 2030 })}
            />
            {errors['endYear']?.type === 'required' && <span>pole jest wymagane </span>}
            {errors['endYear']?.type === 'min' && <span>zbyt mała wartość </span>}
            {errors['endYear']?.type === 'max' && <span>zbyt duża wartość </span>}
            <EditButton type="submit">zapisz</EditButton>
          </form>
        </div>
      ) : (
        <div key={season.seasonId}>
          <SeasonButton onClick={setGameweeks}>
            {`${season.startYear} | `}
            {season.endYear}
          </SeasonButton>
          <EditButton onClick={() => setSeasonEditInput(season.seasonId)}>edytuj</EditButton>
          <EditButton onClick={deleteSeason}>usuń</EditButton>
        </div>
      )}
    </div>
  );
};

export default SeasonInput;
