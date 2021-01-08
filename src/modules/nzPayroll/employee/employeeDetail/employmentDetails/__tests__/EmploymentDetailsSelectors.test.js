import * as selectors from '../EmploymentDetailsSelectors';
import employeeDetails from '../../../mappings/data/employeeDetailEntry';

describe('EmploymentDetailsSelectors', () => {
  describe('getEmploymentStatusOptions', () => {
    it('should get Employment Status Options', () => {
      const expected = employeeDetails.employmentStatusOptions;
      const state = { ...employeeDetails };
      expect(selectors.getEmploymentStatusOptions(state)).toEqual(expected);
    });

    it('should return empty array when Employment StatusO ptions is undefined', () => {
      const expected = undefined;
      const state = {};
      expect(selectors.getEmploymentStatusOptions(state)).toEqual(expected);
    });
  });

  describe('getEmploymentDetails', () => {
    it('should get Employment Details', () => {
      const expected = employeeDetails.payrollDetails.employmentDetails;
      const state = { ...employeeDetails };
      expect(selectors.getEmploymentDetails(state)).toEqual(expected);
    });

    it('should return empty object when payrollDetails is undefined', () => {
      const expected = undefined;
      const state = {};
      expect(selectors.getEmploymentDetails(state)).toEqual(expected);
    });
  });

  describe('getTaxDetails', () => {
    it('should get Tax details', () => {
      const expected = employeeDetails.payrollDetails.tax;
      const state = { ...employeeDetails };
      expect(selectors.getTaxDetails(state)).toEqual(expected);
    });

    it('should return undefined when payrollDetails is undefined', () => {
      const expected = undefined;
      const state = {};
      expect(selectors.getTaxDetails(state)).toEqual(expected);
    });
  });

  describe('getTaxCodeOptions', () => {
    it('should get Tax Code options', () => {
      const expected = employeeDetails.taxCodeOptions;
      const state = { ...employeeDetails };
      expect(selectors.getTaxCodeOptions(state)).toEqual(expected);
    });

    it('should return undefined when state is empty', () => {
      const expected = undefined;
      const state = {};
      expect(selectors.getTaxCodeOptions(state)).toEqual(expected);
    });
  });

  describe('getKiwiSaverDetails', () => {
    it('should get Tax details', () => {
      const expected = employeeDetails.payrollDetails.kiwiSaver;
      const state = { ...employeeDetails };
      expect(selectors.getKiwiSaverDetails(state)).toEqual(expected);
    });
    it('should return undefined when state is empty', () => {
      const expected = undefined;
      const state = {};
      expect(selectors.getKiwiSaverDetails(state)).toEqual(expected);
    });
  });
});
