export default function reducer(state = [], action) {
  switch (action.type) {
    case 'RESET_POKEMON':
      return [];
    case 'ADD_POKEMON':
      return [...state, action.payload];
    case 'GET_POKEMONS':
      return state;
    default:
      return state;
  }
}
