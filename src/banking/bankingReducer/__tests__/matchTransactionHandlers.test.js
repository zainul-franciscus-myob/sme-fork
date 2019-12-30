import {
  addAdjustment,
  removeAdjustment,
  toggleMatchTransactionSelectAllState,
  updateAdjustment,
  updateSelectedTransactionDetails,
} from '../matchTransactionHandlers';

describe('matchTransactionHandlers', () => {
  describe('updateSelectedTransactionDetails', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            entries: [
              {
                matchAmount: 0,
              },
            ],
          },
        },
      };

      const action = {
        index: 0,
        key: 'matchAmount',
        value: 10,
      };

      const expected = {
        openEntry: {
          isEdited: true,
          match: {
            entries: [
              {
                matchAmount: 10,
                selected: true,
              },
            ],
          },
        },
      };

      const actual = updateSelectedTransactionDetails(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('toggleMatchTransactionSelectAllState', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            entries: [
              {
                selected: false,
              },
              {
                selected: false,
              },
            ],
          },
        },
      };

      const action = {
        selected: true,
      };

      const expected = {
        openEntry: {
          isEdited: true,
          match: {
            entries: [
              {
                selected: true,
              },
              {
                selected: true,
              },
            ],
          },
        },
      };

      const actual = toggleMatchTransactionSelectAllState(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('updateAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            adjustments: [
              { id: '1', accountId: '123' },
            ],
          },
        },
      };

      const action = { index: 0, key: 'accountId', value: '321' };

      const expected = {
        openEntry: {
          isEdited: true,
          match: {
            adjustments: [
              { id: '1', accountId: '321' },
            ],
          },
        },
      };

      const actual = updateAdjustment(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('addAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            adjustments: [],
          },
        },
      };

      const action = { id: '1', key: 'accountId', value: '123' };

      const expected = {
        openEntry: {
          isEdited: true,
          match: {
            adjustments: [
              { id: '1', accountId: '123' },
            ],
          },
        },
      };

      const actual = addAdjustment(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('removeAdjustment', () => {
    it('should return correct state', () => {
      const state = {
        openEntry: {
          match: {
            adjustments: [
              { id: '1', accountId: '123' },
            ],
          },
        },
      };

      const action = { index: 0 };

      const expected = {
        openEntry: {
          isEdited: true,
          match: {
            adjustments: [],
          },
        },
      };

      const actual = removeAdjustment(state, action);
      expect(actual).toEqual(expected);
    });
  });
});
