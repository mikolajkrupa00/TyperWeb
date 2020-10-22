import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Select from 'react-select';
import components from '../styles';
import DateTimePicker from 'react-datetime-picker';
import Layout from '../../Layout/index';

const EditMatches = (props) => {
  const dispatch = useDispatch();
  const { teams, matches } = useSelector((x) => x.editPanelState);
  const { register, handleSubmit } = useForm();
  const { SelectContainer, EditConainter, EditMatchRow, Team } = components;
  const [homeTeam, setHomeTeam] = useState();
  const [awayTeam, setAwayTeam] = useState();
  const [time, setTime] = useState();

  const gameweekId = props.location.state;

  useEffect(() => {
    Axios.get(`/match/getMatchesByGameweekId/${gameweekId}`).then((res) => {
      Axios.get('/team').then((res) => {
        dispatch({ type: 'SET_ADMIN_TEAMS', payload: res.data });
      });
      dispatch({ type: 'SET_ADMIN_MATCHES', payload: res.data });
    });
  }, []);

  const saveMatch = () => {
    const request = {
      homeTeamId: +homeTeam.value,
      awayTeamId: +awayTeam.value,
      gameweekId: +gameweekId,
      matchDate: time,
    };
    Axios.post('/match', request).then((res) => {
      const payload = {
        homeTeamName: homeTeam.label,
        awayTeamName: awayTeam.label,
        gameweekId: +gameweekId,
        matchDate: time.toUTCString(),
        homeTeamGoals: null,
        awayTeamGoals: null,
        matchId: res.data,
      };
      dispatch({ type: 'ADD_MATCH', payload: payload });
    });
  };

  const editMatchResult = (data) => {
    const { matchId, homeTeamGoals, awayTeamGoals } = data;
    const request = {
      matchId: +matchId,
      homeTeamGoals: +homeTeamGoals,
      awayTeamGoals: +awayTeamGoals,
    };
    Axios.put('/match/updateMatchResult', request).then((res) => {
      dispatch({ type: 'EDIT_MATCH', payload: request });
    });
  };

  const setMatchEditInput = (id) => {
    dispatch({ type: 'SET_EDIT_MATCH_INPUT', payload: id });
  };

  const deleteMatch = (id) => {
    Axios.delete(`/match/${id}`);
    dispatch({ type: 'DELETE_MATCH', payload: id });
  };

  return (
    <Layout>
      <EditConainter>
        {matches &&
          matches.map((match) => (
            <EditMatchRow>
              {match.matchDate} <br />
              <Team>{match.homeTeamName}</Team>
              {match.isEdited ? (
                <div>
                  <form onSubmit={handleSubmit(editMatchResult)}>
                    <input
                      name="homeTeamGoals"
                      ref={register()}
                      type="number"
                      defaultValue={match.homeTeamGoals ? match.homeTeamGoals : ''}
                    />
                    <input
                      name="awayTeamGoals"
                      ref={register()}
                      type="number"
                      defaultValue={match.awayTeamGoals ? match.awayTeamGoals : ''}
                    />
                    <input type="hidden" name="matchId" ref={register()} value={match.matchId} />
                    <button type="submit">zapisz</button>
                  </form>
                </div>
              ) : (
                <div>
                  {match.homeTeamGoals !== null ? match.homeTeamGoals : '-'} : {match.awayTeamGoals !== null ? match.awayTeamGoals : '-'}
                </div>
              )}
              <Team>{match.awayTeamName}</Team>
              {!match.isEdited && <button onClick={() => setMatchEditInput(match.matchId)}>edytuj wynik</button>}
              <button onClick={() => deleteMatch(match.matchId)}>usuń</button>
            </EditMatchRow>
          ))}

        <SelectContainer>
          <Select
            onChange={setHomeTeam}
            placeholder="gospodarz"
            options={teams && teams.map((x) => ({ value: x.teamId, label: x.teamName }))}
          />
        </SelectContainer>
        <SelectContainer>
          <Select onChange={setAwayTeam} placeholder="gość" options={teams && teams.map((x) => ({ value: x.teamId, label: x.teamName }))} />
        </SelectContainer>
        <DateTimePicker value={time} onChange={setTime} />
        <button onClick={saveMatch}>dodaj</button>
      </EditConainter>
    </Layout>
  );
};

export default EditMatches;
