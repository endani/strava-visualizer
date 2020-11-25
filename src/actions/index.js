import axios from '../apis/axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

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
