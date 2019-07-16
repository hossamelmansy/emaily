import axios from 'axios';

import { FETCH_USER, FETCH_SURVEYS } from './types';

export function fetchUser() {
  return async function(dispatch) {
    var response = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: response.data });
  };
}

export function handleToken(token) {
  return async function(dispatch) {
    var response = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: response.data });
  };
}

export function submitSurvey(values, history) {
  return async function(dispatch) {
    var response = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: response.data });
  };
}

export function fetchSurveys() {
  return async function(dispatch) {
    var response = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: response.data });
  };
}
