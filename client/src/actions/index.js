import axios from 'axios';

import { FETCH_USER } from './types';

export function fetchUser() {
  return async function(dispatch) {
    var response = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: response.data });
  };
}
