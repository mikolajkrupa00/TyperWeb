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
  const { EditConainter } = components;

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
    Axios.delete(`/team/${+teamId}`).then(dispatch({ type: 'DELETE_TEAM', payload: teamId }));
  };

  return (
    <Layout>
      <EditConainter>
        {teams &&
          teams.map((team) => (
            <div>
              {team.teamName}
              <button onClick={() => deleteTeam(team.teamId)}>usuń</button>
            </div>
          ))}
        <form onSubmit={handleSubmit(saveTeam)}>
          nazwa zespołu <input name="teamName" type="text" ref={register({ required: true, minLength: 4, maxLength: 30 })} />
          {errors['teamName']?.type === 'required' && <span>pole wymagane</span>}
          {errors['teamName']?.type === 'minLength' && <span>zbyt krótka nazwa</span>}
          {errors['teamName']?.type === 'maxLength' && <span>zbyt długa nazwa</span>}
          <button type="submit">dodaj</button>
        </form>
      </EditConainter>
    </Layout>
  );
};

export default EditTeamsPage;
