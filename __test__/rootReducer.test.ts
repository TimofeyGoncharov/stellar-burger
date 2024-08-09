import { rootReducer, store } from '../src/services/store';

describe('rootReducer', () => {
  test('rootReducer on UNKNOWN_ACTION && undefined', () => {
    const before = store.getState();

    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(after).toEqual(before);
  });
});
