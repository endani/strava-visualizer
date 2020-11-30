import axios from '../apis/axios';
import ENV from '../ENV.ts';
import store from '../store';

const BASE_URL = 'https://www.strava.com';

const API_CLIENT = ENV.STRAVA_CLIENT;
const API_SECRET = ENV.STRAVA_SECRET;

export const setToken = (code) => async (dispatch) => {
  const response = await axios.post(`${BASE_URL}/oauth/token`, {
    grant_type: 'authorization_code',
    client_id: API_CLIENT,
    client_secret: API_SECRET,
    code,
  });

  await dispatch({ type: 'SET_TOKEN', payload: response.data });
  console.log(response.data);
  const athlete = await axios.get(`${BASE_URL}/api/v3/athlete`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${response.data.access_token}`,
    },
  });

  console.log(athlete.data);
  // dispatch({ type: 'SET_USER', payload: response.data });
};

export const allPokemon = (url) => async (dispatch) => {
  const response = await axios.get(url);
  const { results } = response.data;

  dispatch({ type: 'RESET_POKEMON' });

  results.forEach(async (item) => {
    const responseSingle = await axios.get(`${BASE_URL}${item.name}`);
    item.data = responseSingle.data;
    dispatch({ type: 'ADD_POKEMON', payload: item });
  });

  dispatch({
    type: 'GET_PAGINATION',
    payload: {
      next: response.data.next,
      previous: response.data.previous,
    },
  });
};

export const infoPokemon = () => async (dispatch) => {
  dispatch({
    type: 'GET_POKEMONS',
  });
};
