import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../Layout';
import { localStorageService } from '../../../services/localStorageService';
import components from '../styles';

const EditTeamsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { teams } = useSelector((x) => x.editPanelState);
  const { register, handleSubmit, reset, errors } = useForm();
  const { EditConainter, TeamData, EditButton, TeamsContainer, TeamInput, AddTeamButton, TeamImg, ImgDiv } = components;

  useEffect(() => {
    localStorageService.role === '0'
      ? Axios.get('/team').then((res) => {
        dispatch({ type: 'SET_ADMIN_TEAMS', payload: res.data });
      })
      : history.push('/');
  }, []);

  const saveTeam = ({ teamName }) => {
    Axios.post('/team', { teamName: teamName }).then((res) => {
      dispatch({ type: 'ADD_TEAM', payload: { teamName: teamName, teamId: res.data } });
    });
    reset(['teamName']);
  };

  const deleteTeam = (teamId) => {
    Axios.delete(`/team/${teamId}`).then(dispatch({ type: 'DELETE_TEAM', payload: teamId }));
  };

  return (
    <Layout>
      <EditConainter>
        {teams &&
          teams.map((team) => (
            <TeamsContainer>
              <TeamData>
                <ImgDiv>
                  <TeamImg src={`${team.teamName}.png`} />
                </ImgDiv>
                {team.teamName}
              </TeamData>
              <EditButton onClick={() => deleteTeam(team.teamId)}>usuń</EditButton>
            </TeamsContainer>
          ))}
        <form onSubmit={handleSubmit(saveTeam)}>
          <TeamInput placeholder="nazwa zespołu" name="teamName" type="text" ref={register({ required: true, minLength: 4, maxLength: 30 })} />
          {errors['teamName']?.type === 'required' && <span>pole wymagane</span>}
          {errors['teamName']?.type === 'minLength' && <span>zbyt krótka nazwa</span>}
          {errors['teamName']?.type === 'maxLength' && <span>zbyt długa nazwa</span>}
          <AddTeamButton type="submit">dodaj nowy</AddTeamButton>
        </form>
      </EditConainter>
    </Layout>
  );
};

export default EditTeamsPage;
