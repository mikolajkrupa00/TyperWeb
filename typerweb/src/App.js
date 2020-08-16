import React from 'react';
import {Switch, Route} from 'react-router-dom';
import CreateSeason from './components/createSeason';
import { Provider } from 'react-redux';
import {createStore } from 'redux';
import seasonState from './components/seasonsPage/reducer';
import './App.css';
import {setupAxiosInterceptors} from "./interceptor";

setupAxiosInterceptors();

const App = () =>
{
  const store = createStore(seasonState);
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/createSeason" component={CreateSeason} />
      </Switch>
    </Provider>
  );
}

export default App;
