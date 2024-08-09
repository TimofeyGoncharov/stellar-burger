import { fetchFeeds, feedsInitialState } from '../src/services/slices';

import reducer from '../src/services/slices/feeds';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('feedsReducer', () => {
  describe('asymc function get feeds: fetchFeeds', () => {
    test('fetchFeeds.pending', () => {
      const state = reducer(feedsInitialState, fetchFeeds.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('fetchFeeds.fulfilled', () => {
      const state = reducer(
        feedsInitialState,
        fetchFeeds.fulfilled(feedsMockData, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(feedsMockData);
    });

    test('fetchFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = reducer(
        feedsInitialState,
        fetchFeeds.rejected(new Error(error), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});
