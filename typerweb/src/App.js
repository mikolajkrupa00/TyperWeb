import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateSeason from './components/createSeason';
import { Provider } from 'react-redux';
import {createStore, combineReducers } from 'redux';
import SeasonsPage from './components/seasonsPage'
import layoutState from './components/layout/reducer';
import './App.css';
import {setupAxiosInterceptors} from "./services/interceptor";
setupAxiosInterceptors();

const App = () =>
{
  const store = createStore(layoutState);
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/createSeason" component={CreateSeason} />
        <Route path="/seasons" component={SeasonsPage}/>
      </Switch>
    </Provider>
  );
}

export default App;
