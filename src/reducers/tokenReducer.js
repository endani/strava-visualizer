const initialState = {
  token_type: 'Bearer',
  expires_at: 1607121946,
  expires_in: 21112,
  refresh_token: 'dd2162403a31c67b4a82c326ee61f7bd30ed7ef8',
  access_token: '1ddee66f9ce30268a985d1e842cd13d36db8c03a',
  athlete: {
    id: 3741352,
    username: 'dani_ramrez',
    resource_state: 2,
    firstname: 'Dani',
    lastname: 'Ramírez',
    city: 'Sant Just Desvern',
    state: 'Catalonia',
    country: 'Spain',
    sex: 'M',
    premium: true,
    summit: true,
    created_at: '2014-01-19T08:51:33Z',
    updated_at: '2020-11-14T23:00:06Z',
    badge_type_id: 1,
    profile_medium:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3741352/2032398/4/medium.jpg',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3741352/2032398/4/large.jpg',
    friend: null,
    follower: null,
  },
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.payload;
    default:
      return state;
  }
}
