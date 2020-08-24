import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, combineReducers } from 'redux';
import layoutState from './components/layout/reducer';
import editPanelState from './components/EditPanel/reducer'
import './App.css';
import {setupAxiosInterceptors} from "./services/interceptor";
import EditPanel from "./components/EditPanel"

setupAxiosInterceptors();

const App = () =>
{
  const reducers = combineReducers({
    layoutState,
    editPanelState
  })
  const store = createStore(reducers);
  
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/adminSeasons" component={EditPanel}/>
      </Switch>
    </Provider>
  );
}

export default App;
