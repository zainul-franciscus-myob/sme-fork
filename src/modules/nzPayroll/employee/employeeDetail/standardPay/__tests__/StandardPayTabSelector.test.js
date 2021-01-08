import * as selectors from '../StandardPayTabSelector';
import employeeDetails from '../../../mappings/data/employeeDetailEntry';

describe('StandardPayTabSelector', () => {
  it('getPayCycleOptions should get Pay cycle options', () => {
    const expected = employeeDetails.payCycleOptions;
    const state = { ...employeeDetails };
    expect(selectors.getPayCycleOptions(state)).toEqual(expected);
  });

  it('getBasePayDetails should get Pay cycle options', () => {
    const expected = employeeDetails.payrollDetails.wage;
    const state = { ...employeeDetails };
    expect(selectors.getBasePayDetails(state)).toEqual(expected);
  });

  it('getEarningsDetails should get Pay cycle options', () => {
    const expected = {
      ...employeeDetails.payrollDetails.wage,
      calculatedAmount: expect.anything(),
    };
    const state = { ...employeeDetails };
    expect(selectors.getEarningsDetails(state)).toEqual(expected);
  });
});
