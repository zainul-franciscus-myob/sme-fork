import { UPDATE_TAX_KIWISAVER_DETAIL } from '../TaxAndKiwiSaverIntents';
import taxAndKiwiSaverReducer from '../taxAndKiwiSaverReducer';

describe('leaveReducer', () => {
  const reducer = taxAndKiwiSaverReducer[UPDATE_TAX_KIWISAVER_DETAIL];

  it('should update the tax and KiwiSaver for given key', () => {
    const state = { payrollDetails: { taxAndKiwiSaver: { irdNumber: 'num' } } };

    const action = { key: 'irdNumber', value: '555' };

    expect(reducer(state, action)).toMatchObject({
      isPageEdited: true,
      payrollDetails: { taxAndKiwiSaver: { irdNumber: '555' } },
    });
  });

  it('should not update existing taxAndKiwiSaver keys when passed in key does not exist', () => {
    const taxAndKiwiSaver = { irdNumber: 'num' };
    const state = { payrollDetails: { taxAndKiwiSaver } };

    const action = { key: 'test', value: 'test' };

    expect(reducer(state, action)).toMatchObject({
      payrollDetails: { taxAndKiwiSaver },
    });
  });
});
