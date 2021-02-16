import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Select from 'react-select';
import components from '../styles';
import DateTimePicker from 'react-datetime-picker';
import Layout from '../../Layout/index';
import dateFormat from 'dateformat';

const EditMatches = (props) => {
  const dispatch = useDispatch();
  const { teams, matches } = useSelector((x) => x.editPanelState);
  const { register, handleSubmit } = useForm();
  const { SelectContainer, EditConainter, EditMatchRow, HomeTeam, AwayTeam, MatchDate, MatchResult, EditButton, EditMatchForm,
    EditMatchInput, TeamImg, ImgDiv } = components;
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
      homeTeamId: homeTeam.value,
      awayTeamId: awayTeam.value,
      gameweekId: gameweekId,
      matchDate: time,
    };
    console.log(request);
    Axios.post('/match', request).then((res) => {
      const payload = {
        homeTeamName: homeTeam.label,
        awayTeamName: awayTeam.label,
        gameweekId: gameweekId,
        matchDate: new Date(time),
        homeTeamGoals: null,
        awayTeamGoals: null,
        matchId: res.data,
      };
      dispatch({ type: 'ADD_MATCH', payload: payload });
    });
  };

  const editMatchResult = (data) => {
    const { matchId, homeTeamGoals, awayTeamGoals } = data;
    console.log(data);
    console.log(data.matchId)
    const request = {
      matchId: matchId,
      homeTeamGoals: +homeTeamGoals,
      awayTeamGoals: +awayTeamGoals,
    };
    console.log(request);
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
              <MatchDate>
                {dateFormat(new Date(match.matchDate), 'mm-dd-yyyy HH:MM:ss')}
              </MatchDate>
              <HomeTeam>{match.homeTeamName}</HomeTeam>
              <ImgDiv>
                <TeamImg src={`${match.homeTeamName}.png`} />
              </ImgDiv>
              {match.isEdited ?
                <EditMatchForm onSubmit={handleSubmit(editMatchResult)}>
                  <EditMatchInput
                    name="homeTeamGoals"
                    ref={register()}
                    type="number"
                    defaultValue={match.homeTeamGoals !== null ? match.homeTeamGoals : ''}
                  />
                    -
                    <EditMatchInput
                    name="awayTeamGoals"
                    ref={register()}
                    type="number"
                    defaultValue={match.awayTeamGoals !== null ? match.awayTeamGoals : ''}
                  />
                  <EditMatchInput type="hidden" name="matchId" ref={register()} value={match.matchId} />
                  <AwayTeam>{match.awayTeamName}</AwayTeam>
                  <EditButton type="submit" >Zapisz</EditButton>
                </EditMatchForm> :
                <>
                  <MatchResult>
                    {match.homeTeamGoals !== null ? match.homeTeamGoals : ''} - {match.awayTeamGoals !== null ? match.awayTeamGoals : ''}
                  </MatchResult>
                  <ImgDiv>
                    <TeamImg src={`${match.awayTeamName}.png`} />
                  </ImgDiv>
                  <AwayTeam>{match.awayTeamName}</AwayTeam>
                  <EditButton onClick={() => setMatchEditInput(match.matchId)}>edytuj wynik</EditButton>
                  <EditButton onClick={() => deleteMatch(match.matchId)}>usuń</EditButton>
                </>
              }
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
        <EditButton onClick={saveMatch}>dodaj</EditButton>
      </EditConainter>
    </Layout>
  );
};

export default EditMatches;
