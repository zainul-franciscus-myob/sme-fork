import { UPDATE_TAX_DETAIL } from '../../EmployeeDetailIntents';
import taxAndKiwiSaverReducer from '../taxAndKiwiSaverReducer';

describe('leaveReducer', () => {
  const reducer = taxAndKiwiSaverReducer[UPDATE_TAX_DETAIL];

  it('should update the tax for given key', () => {
    const state = { payrollDetails: { tax: { irdNumber: 'num' } } };

    const action = { key: 'irdNumber', value: '555' };

    expect(reducer(state, action)).toMatchObject({
      userInterface: { isPageEdited: true },
      payrollDetails: { tax: { irdNumber: '555' } },
    });
  });

  it('should not update existing tax keys when passed in key does not exist', () => {
    const tax = { irdNumber: 'num' };
    const state = { payrollDetails: { tax } };

    const action = { key: 'test', value: 'test' };

    expect(reducer(state, action)).toMatchObject({
      payrollDetails: { tax },
    });
  });
});
