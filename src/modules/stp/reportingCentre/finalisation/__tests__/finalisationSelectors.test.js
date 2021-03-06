import { getDefaultState } from '../FinalisationReducer';
import {
  getIsRFBALocked,
  getPayrollYears,
  getShouldShowFinaliseButton,
  getShouldShowRemoveFinalisationButton,
  getSubmitEmployeesFinalisationContent,
  getSubmitEmployeesRemoveFinalisationContent,
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
        employees: [{ isFinalised: true, isSelected: true }],
      };

      expect(getShouldShowFinaliseButton(state)).toBeFalsy();
    });

    it('returns false when there are unfinalised employees but they are not selected', () => {
      const state = {
        employees: [{ isFinalised: false, isSelected: false }],
      };

      expect(getShouldShowFinaliseButton(state)).toBeFalsy();
    });
  });

  describe('getShouldShowRemoveFinalisationButton', () => {
    it('returns true when finalised employees are selected', () => {
      const state = {
        employees: [{ isFinalised: true, isSelected: true }],
      };

      expect(getShouldShowRemoveFinalisationButton(state)).toBeTruthy();
    });

    it('returns false when no finalised employees are selected', () => {
      const state = {
        employees: [{ isFinalised: false, isSelected: true }],
      };

      expect(getShouldShowRemoveFinalisationButton(state)).toBeFalsy();
    });

    it('returns false when there are finalised employees but they are not selected', () => {
      const state = {
        employees: [{ isFinalised: true, isSelected: false }],
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

  describe('getSubmitEmployeesFinalisationContent', () => {
    it('only includes selected unfinalised employees', () => {
      const state = {
        eventId: '123',
        employees: [
          {
            id: '1',
            isFinalised: false,
            isSelected: true,
          },
          {
            id: '2',
            isFinalised: false,
            isSelected: false,
          },
          {
            id: '3',
            isFinalised: true,
            isSelected: true,
          },
          {
            id: '4',
            isFinalised: true,
            isSelected: false,
          },
        ],
      };

      expect(getSubmitEmployeesFinalisationContent(state)).toEqual({
        eventId: '123',
        employees: [
          {
            id: '1',
            isFinalised: false,
            isSelected: true,
          },
        ],
      });
    });
  });

  describe('getSubmitEmployeesRemoveFinalisationContent', () => {
    it('only includes selected finalised employees', () => {
      const state = {
        eventId: '123',
        employees: [
          {
            id: '1',
            isFinalised: true,
            isSelected: true,
          },
          {
            id: '2',
            isFinalised: true,
            isSelected: false,
          },
          {
            id: '3',
            isFinalised: false,
            isSelected: true,
          },
          {
            id: '4',
            isFinalised: false,
            isSelected: false,
          },
        ],
      };

      expect(getSubmitEmployeesRemoveFinalisationContent(state)).toEqual({
        eventId: '123',
        employees: [
          {
            id: '1',
            isFinalised: true,
            isSelected: true,
          },
        ],
      });
    });
  });
});
