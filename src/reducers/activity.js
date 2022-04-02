export default function reducer(state = {}, action) {
  switch (action.type) {
    case "GET_ACTIVITIES":
      return action.payload
    default:
      return state
  }
}
