import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import layoutState from './components/Layout/reducer';
import editPanelState from './components/EditPanel/reducer';
import typerState from './components/Typer/reducer';
import './App.css';
import { setupAxiosInterceptors } from './services/interceptor';
import EditPanelPage from './components/EditPanel';
import NotFound from './components/NotFound';
import EditTeamsPage from './components/EditPanel/EditTeamsPage';
import EditMatches from './components/EditPanel/EditMatches';
import HomePage from './components/HomePage';
import { useHistory } from 'react-router-dom';
import Typer from './components/Typer';
import Ranking from './components/Ranking';
import rankingState from './components/Ranking/reducer';
import RegisterPage from './components/RegisterPage';

setupAxiosInterceptors();

const App = () => {
  const reducers = combineReducers({
    layoutState,
    editPanelState,
    typerState,
    rankingState,
  });
  const store = createStore(reducers);
  const history = useHistory();

  return (
    <Provider store={store}>
      <Switch>
        <Route path="/adminPanel" component={EditPanelPage} />
        <Route path="/editTeams" component={EditTeamsPage} />
        <Route path="/editMatches" component={EditMatches} />
        <Route path="/NotFound" component={NotFound} />
        <Route path="/typer" component={Typer} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Provider>
  );
};

export default App;
