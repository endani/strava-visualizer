const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ACTIVITIES':
      return action.payload;
    default:
      return state;
  }
}
