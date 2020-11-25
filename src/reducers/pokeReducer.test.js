import reducer from './PokeReducer';

describe('Pokemon Reducer', () => {
  describe('Fetch Pokemon', () => {
    it('FETCH_POKEMON', () => {
      const result = reducer(1, {
        type: 'FETCH_POKEMON',
        payload: 2,
      });
      expect(result).toEqual(2);
    });

    it('default', () => {
      const resultado = reducer(1, {
        type: 'NO_TYPE',
      });
      expect(resultado).toEqual(1);
    });
  });
});
