import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import components from '../styles';

const SeasonInput = ({ season }) => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { EditButton, EditInput, SeasonButton, SeasonContainer, CreateForm, InputError, EditSubmit } = components;
  const { seasonId, endYear, startYear, isEdited, isExpanded } = season
  const { gameweeks } = useSelector(x => x.editPanelState);

  const saveSeason = (data) => {
    const request = {
      seasonId: seasonId,
      startYear: +data.startYear,
      endYear: +data.endYear,
    };
    Axios.put('/season', request).then((res) => {
      dispatch({ type: 'EDIT_SEASON', payload: request });
    });
  };

  const setGameweeks = () => {
    !isExpanded
      ? (Axios.get(`/gameweek/getGameweeksBySeasonId/${seasonId}`).then((res) => {
        dispatch({
          type: 'SET_ADMIN_GAMEWEEKS',
          payload: {
            gameweeks: res.data,
            seasonId: seasonId,
          },
        });
      }))
      : (
        dispatch({ type: 'BACK_GAMEWEEKS' })

      );
  };

  const deleteSeason = () => {
    Axios.delete(`/season/${seasonId}`).then(() => {
      dispatch({ type: 'DELETE_SEASON', payload: seasonId });
    });
  };

  const setSeasonEditInput = (id) => {
    dispatch({ type: "SET_SEASON_EDIT_INPUT", payload: id })
  };

  const buildSeason = () => {
    // createTeams(startYear, endYear)
    // createGameweeks(seasonId)
    // createMatches(startYear, endYear, seasonId)

    const year = `${startYear}-${`${endYear}`.slice(2, 4)}`
    let teamNames;
    fetch(`https://raw.githubusercontent.com/openfootball/football.json/master/${year}/en.1.clubs.json`)
      .then(response => response.json()) // bearer token causes CORS policy error when using Axios (interceptor adds bearer) 
      .then(data => {
        teamNames = data.clubs.map(x => x.name.replace(" FC", ""));
        fetch(`https://raw.githubusercontent.com/openfootball/football.json/master/${year}/en.1.json`)
          .then(response => response.json()) // bearer token causes CORS policy error when using Axios (interceptor adds bearer)
          .then(data => {
            const matches = data.matches.map(match => ({
              homeTeamName: match.team1.replace(" FC", ""),
              awayTeamName: match.team2.replace(" FC", ""),
              gameweekNumber: +match.round.replace("Matchday ", ""),
              matchDate: new Date(match.date),
              awayTeamGoals: match.score === undefined ? null : +match.score.ft[1],
              homeTeamGoals: match.score === undefined ? null : +match.score.ft[0]
            }));
            const request = {
              gameweekAmount: teamNames.length * 2 - 2,
              matches: matches,
              teamNames: teamNames,
              seasonId: seasonId
            }
            console.log(request)
            Axios.post("/season/buildSeason", request);
          });
      })

  }

  return (
    <div>
      {isEdited ? (
        <div key={seasonId}>
          <CreateForm onSubmit={handleSubmit(saveSeason)}>
            <EditInput
              defaultValue={startYear}
              type="number"
              name="startYear"
              ref={register({ required: true, min: 2000, max: 2030 })}
            />
            {errors['startYear']?.type === 'required' && <InputError>pole jest wymagane </InputError>}
            {errors['startYear']?.type === 'min' && <InputError>zbyt mała wartość </InputError>}
            {errors['startYear']?.type === 'max' && <InputError>zbyt duża wartość </InputError>}
            <EditInput
              defaultValue={endYear}
              type="number"
              name="endYear"
              ref={register({ required: true, min: 2000, max: 2030 })}
            />
            {errors['endYear']?.type === 'required' && <InputError>pole jest wymagane </InputError>}
            {errors['endYear']?.type === 'min' && <InputError>zbyt mała wartość </InputError>}
            {errors['endYear']?.type === 'max' && <InputError>zbyt duża wartość </InputError>}
            <EditSubmit type="submit">zapisz</EditSubmit>
          </CreateForm>
        </div>
      ) : (
          <SeasonContainer key={seasonId}>
            <SeasonButton onClick={setGameweeks}>
              {`Sezon ${startYear} | `}
              {endYear}
            </SeasonButton>
            <EditButton onClick={() => setSeasonEditInput(seasonId)}>edytuj</EditButton>
            <EditButton onClick={deleteSeason}>usuń</EditButton>
            {isExpanded && gameweeks[0] === undefined && <EditButton onClick={() => buildSeason()}>Zbuduj sezon</EditButton>}
          </SeasonContainer>
        )}
    </div>
  );
};

export default SeasonInput;
