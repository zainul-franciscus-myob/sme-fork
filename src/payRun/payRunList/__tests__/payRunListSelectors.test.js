import { getEmptyState, getIsTableEmpty } from '../payRunListSelectors';
import emptyViewTypes from '../emptyViewTypes';

describe('payRunListSelectors', () => {
  describe('getEmptyState', () => {
    describe('filters touched is true', () => {
      it('should return No Pay Runs Filtered if STP is registered', () => {
        const state = {
          filtersTouched: true,
          stpRegistrationStatus: 'registered',
        };
        const expected = emptyViewTypes.noPayRunsFiltered;

        expect(getEmptyState(state)).toEqual(expected);
      });

      it('should return No Pay Runs Filtered if STP is not registered', () => {
        const state = {
          filtersTouched: true,
          stpRegistrationStatus: 'notRegistered',
        };
        const expected = emptyViewTypes.noPayRunsFiltered;

        expect(getEmptyState(state)).toEqual(expected);
      });

      it('should return No Pay Runs Filtered if STP is lost connection', () => {
        const state = {
          filtersTouched: true,
          stpRegistrationStatus: 'lostConnection',
        };
        const expected = emptyViewTypes.noPayRunsFiltered;

        expect(getEmptyState(state)).toEqual(expected);
      });
    });

    describe('filters touched is false', () => {
      it('should return No Pay Runs if STP is registered', () => {
        const state = {
          filtersTouched: false,
          stpRegistrationStatus: 'registered',
        };
        const expected = emptyViewTypes.noPayRuns;

        expect(getEmptyState(state)).toEqual(expected);
      });

      it('should return No Pay Runs Filtered if filters touched is true and STP is lost connection', () => {
        const state = {
          filtersTouched: false,
          stpRegistrationStatus: 'notRegistered',
        };
        const expected = emptyViewTypes.notStpRegistered;

        expect(getEmptyState(state)).toEqual(expected);
      });

      it('should return No Pay Runs Filtered if filters touched is true and STP is lost connection', () => {
        const state = {
          filtersTouched: false,
          stpRegistrationStatus: 'lostConnection',
        };
        const expected = emptyViewTypes.stpConnectionLost;

        expect(getEmptyState(state)).toEqual(expected);
      });
    });
  });

  describe('getIsTableEmpty', () => {
    it('should return true if entries is empty', () => {
      const state = { entries: [] };
      expect(getIsTableEmpty(state)).toEqual(true);
    });

    it('should return false if there is at one entry', () => {
      const state = { entries: [{}] };
      expect(getIsTableEmpty(state)).toEqual(false);
    });
  });
});
