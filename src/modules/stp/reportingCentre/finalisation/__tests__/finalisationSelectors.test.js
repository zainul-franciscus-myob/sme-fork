import { getDefaultState } from '../FinalisationReducer';
import {
  getIsRFBALocked,
  getPayrollYears,
  getShouldShowFinaliseButton,
  getShouldShowRemoveFinalisationButton,
} from '../FinalisationSelector';

describe('finalisationSelectors', () => {
  describe('getPayrollYears', () => {
    it('gets the payroll years', () => {
      const state = getDefaultState();

      const result = getPayrollYears(state);

      expect(result).toEqual([]);
    });
  });

  describe('getShouldShowFinaliseButton', () => {
    it('returns true when unfinalised employees are selected', () => {
      const state = {
        employees: [
          { isFinalised: false, isSelected: true },
          { isFinalised: true, isSelected: true },
        ],
      };

      expect(getShouldShowFinaliseButton(state)).toBeTruthy();
    });

    it('returns false when no unfinalised employees are selected', () => {
      const state = {
        employees: [
          { isFinalised: true, isSelected: true },
        ],
      };

      expect(getShouldShowFinaliseButton(state)).toBeFalsy();
    });

    it('returns false when there are unfinalised employees but they are not selected', () => {
      const state = {
        employees: [
          { isFinalised: false, isSelected: false },
        ],
      };

      expect(getShouldShowFinaliseButton(state)).toBeFalsy();
    });
  });

  describe('getShouldShowRemoveFinalisationButton', () => {
    it('returns true when finalised employees are selected', () => {
      const state = {
        employees: [
          { isFinalised: true, isSelected: true },
        ],
      };

      expect(getShouldShowRemoveFinalisationButton(state)).toBeTruthy();
    });

    it('returns false when no finalised employees are selected', () => {
      const state = {
        employees: [
          { isFinalised: false, isSelected: true },
        ],
      };

      expect(getShouldShowRemoveFinalisationButton(state)).toBeFalsy();
    });

    it('returns false when there are finalised employees but they are not selected', () => {
      const state = {
        employees: [
          { isFinalised: true, isSelected: false },
        ],
      };

      expect(getShouldShowRemoveFinalisationButton(state)).toBeFalsy();
    });
  });

  describe('getIsRFBALocked', () => {
    it('returns true if any employees have an RFBA field value', () => {
      const state = {
        employees: [
          {
            rfbAmount: '123',
            s57aRfbAmount: '',
          },
        ],
      };

      expect(getIsRFBALocked(state)).toBeTruthy();
    });

    it('returns false when employees have no RFBA field values', () => {
      const state = {
        employees: [
          {
            rfbAmount: '',
            s57aRfbAmount: '',
          },
        ],
      };

      expect(getIsRFBALocked(state)).toBeFalsy();
    });
  });
});
