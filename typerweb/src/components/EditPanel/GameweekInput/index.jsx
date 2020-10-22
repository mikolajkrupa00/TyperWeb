import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import components from '../styles';
import { useHistory } from 'react-router-dom';

const GameweekInput = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const { gameweek } = props;
  const { gameweekId, isEdited, gameweekNumber } = gameweek;
  const { EditButton, EditInput, GameweekButton, AddButton } = components;

  const saveGameweek = ({ gameweekNumber }) => {
    const request = {
      gameweekId: +gameweekId,
      gameweekNumber: +gameweekNumber,
    };
    Axios.put('/gameweek', request).then((res) => {
      dispatch({ type: 'EDIT_GAMEWEEK', payload: request });
    });
  };

  const setGameweekEditInput = () => {
    dispatch({ type: 'SET_GAMEWEEK_EDIT_INPUT', payload: gameweekId });
  };

  const deleteGameweek = () => {
    Axios.delete(`/gameweek/${+gameweekId}`).then(() => {
      dispatch({ type: 'DELETE_GAMEWEEK', payload: gameweekId });
    });
  };

  return (
    <div>
      {!isEdited ? (
        <div key={gameweekId}>
          <GameweekButton onClick={() => history.push('/editMatches', gameweekId)}>{gameweekNumber}</GameweekButton>
          <EditButton onClick={setGameweekEditInput}>edytuj</EditButton>
          <EditButton onClick={deleteGameweek}>usuń</EditButton>
        </div>
      ) : (
        <div key={gameweekId}>
          <form onSubmit={handleSubmit(saveGameweek)}>
            <EditInput
              type="number"
              name="gameweekNumber"
              defaultValue={gameweekNumber}
              ref={register({ required: true, min: 1, max: 50 })}
            />
            {errors['gameweekNumber']?.type === 'required' && <span>pole wymagane</span>}
            {errors['gameweekNumber']?.type === 'min' && <span>zbyt mała wartość</span>}
            {errors['gameweekNumber']?.type === 'max' && <span>zbyt duża wartość</span>}
            <EditButton type="submit">zapisz</EditButton>
          </form>
        </div>
      )}
    </div>
  );
};

export default GameweekInput;
