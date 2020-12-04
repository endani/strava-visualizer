import axios from '../apis/axios';
import ENV from '../ENV.ts';

const BASE_URL = 'https://www.strava.com';

const API_CLIENT = ENV.STRAVA_CLIENT;
const API_SECRET = ENV.STRAVA_SECRET;

export const setToken = (code) => async (dispatch) => {
  // const response = await axios.post(`${BASE_URL}/oauth/token`, {
  //   grant_type: 'authorization_code',
  //   client_id: API_CLIENT,
  //   client_secret: API_SECRET,
  //   code,
  // });
  // console.log(response.data);
  // await dispatch({ type: 'SET_TOKEN', payload: response.data });
};

export const getAthlete = (token) => async (dispatch) => {
  // const athlete = await axios.get(`${BASE_URL}/api/v3/athlete`, {
  //   headers: {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // dispatch({ type: 'SET_USER', payload: athlete.data });
};
