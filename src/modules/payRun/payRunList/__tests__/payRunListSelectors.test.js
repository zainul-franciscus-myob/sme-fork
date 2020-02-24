import { getEmptyState, shouldShowEmptyState } from '../payRunListSelectors';
import emptyViewTypes from '../emptyViewTypes';

describe('payRunListSelectors', () => {
  describe('getEmptyState', () => {
    describe('STP is not registered', () => {
      it('should return noPayRuns if filters touched is false', () => {
        const state = {
          filtersTouched: false,
          stpRegistrationStatus: 'notRegistered',
        };
        const expected = emptyViewTypes.noPayRuns;

        expect(getEmptyState(state)).toEqual(expected);
      });

      it('should return noPayRunsFiltered if filters touched is true', () => {
        const state = {
          filtersTouched: true,
          stpRegistrationStatus: 'notRegistered',
        };
        const expected = emptyViewTypes.noPayRunsFiltered;

        expect(getEmptyState(state)).toEqual(expected);
      });
    });

    describe('STP connection lost', () => {
      it('should return stpConnectionLost if filters touched is false', () => {
        const state = {
          filtersTouched: false,
          stpRegistrationStatus: 'lostConnection',
        };
        const expected = emptyViewTypes.stpConnectionLost;

        expect(getEmptyState(state)).toEqual(expected);
      });

      it('should return notStpRegistered if filters touched is true', () => {
        const state = {
          filtersTouched: true,
          stpRegistrationStatus: 'lostConnection',
        };
        const expected = emptyViewTypes.stpConnectionLost;

        expect(getEmptyState(state)).toEqual(expected);
      });
    });

    describe('STP is registered', () => {
      it('should return noPayRuns if filters touched is false', () => {
        const state = {
          filtersTouched: false,
          stpRegistrationStatus: 'registered',
        };
        const expected = emptyViewTypes.noPayRuns;

        expect(getEmptyState(state)).toEqual(expected);
      });

      it('should return noPayRunsFiltered if filters touched is true', () => {
        const state = {
          filtersTouched: true,
          stpRegistrationStatus: 'registered',
        };
        const expected = emptyViewTypes.noPayRunsFiltered;

        expect(getEmptyState(state)).toEqual(expected);
      });
    });
  });

  describe('shouldShowEmptyState', () => {
    describe('when registered', () => {
      it('should return true if entries is empty', () => {
        const state = {
          entries: [],
          stpRegistrationStatus: 'registered',
        };

        expect(shouldShowEmptyState(state)).toEqual(true);
      });

      it('should return false if there is at one entry', () => {
        const state = {
          entries: [{}],
          stpRegistrationStatus: 'registered',
        };

        expect(shouldShowEmptyState(state)).toEqual(false);
      });
    });

    describe('when connection is lost', () => {
      it('should return true if entries is empty', () => {
        const state = {
          entries: [],
          stpRegistrationStatus: 'lostConnection',
        };

        expect(shouldShowEmptyState(state)).toEqual(true);
      });

      it('should return true if entries is not empty', () => {
        const state = {
          entries: [{}],
          stpRegistrationStatus: 'lostConnection',
        };

        expect(shouldShowEmptyState(state)).toEqual(true);
      });
    });
  });
});
