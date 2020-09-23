import {
  UPDATE_IRDNUMBER_ONBLUR,
  UPDATE_KIWISAVER_DETAIL,
  UPDATE_TAX_CODE,
  UPDATE_TAX_DETAIL,
} from '../TaxAndKiwiSaverIntents';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

describe('Tax and KiwiSaver Reducer', () => {
  it('should update the tax for given key', () => {
    const state = { payrollDetails: { tax: { irdNumber: 'num' } } };

    const action = {
      intent: UPDATE_TAX_DETAIL,
      key: 'irdNumber',
      value: '555',
    };

    expect(employeeDetailNzReducer(state, action)).toMatchObject({
      isPageEdited: true,
      payrollDetails: { tax: { irdNumber: '555' } },
    });
  });

  it('should not update existing tax keys when passed in key does not exist', () => {
    const tax = { irdNumber: 'num' };
    const state = { payrollDetails: { tax } };

    const action = { intent: UPDATE_TAX_DETAIL, key: 'test', value: 'test' };

    expect(employeeDetailNzReducer(state, action)).toMatchObject({
      payrollDetails: { tax },
    });
  });

  it('should reset IRD number when tax code is ND', () => {
    const state = {
      payrollDetails: { tax: { irdNumber: '123 123 123', taxCode: 'M' } },
    };

    const action = { intent: UPDATE_TAX_CODE, value: 'ND' };

    expect(employeeDetailNzReducer(state, action)).toMatchObject({
      isPageEdited: true,
      payrollDetails: { tax: { irdNumber: '000000000', taxCode: 'ND' } },
    });
  });

  it('should add 0 to the begining of the Ird Number when Ird Number length is 8', () => {
    const state = {
      payrollDetails: { tax: { irdNumber: '12312312', taxCode: 'M' } },
    };

    const action = { intent: UPDATE_IRDNUMBER_ONBLUR, value: '12312312' };

    expect(employeeDetailNzReducer(state, action)).toMatchObject({
      isPageEdited: true,
      payrollDetails: { tax: { irdNumber: '012312312', taxCode: 'M' } },
    });
  });

  it('should update the kiwiSaver for given key', () => {
    const state = { payrollDetails: { kiwiSaver: { kiwiSaverStatus: 1 } } };

    const action = {
      intent: UPDATE_KIWISAVER_DETAIL,
      key: 'kiwiSaverStatus',
      value: 2,
    };

    expect(employeeDetailNzReducer(state, action)).toMatchObject({
      isPageEdited: true,
      payrollDetails: { kiwiSaver: { kiwiSaverStatus: 2 } },
    });
  });
});
