import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import { getDefaultState } from '../../payRunListReducer';
import PayRunListTable from '../PayRunListTable';
import TestStore from '../../../../../../store/TestStore';
import formatCurrency from '../../../../../../common/valueFormatters/formatCurrency';

const totalTakeHomePay = 1663.59;
let sampleEntries = [];
describe('PayRunListTable', () => {
  let defaultState = {};
  let store = {};
  beforeEach(() => {
    sampleEntries = [
      {
        paymentDate: '2019/11/07',
        payPeriodStart: '2017/02/24',
        payPeriodEnd: '2017/02/24',
        employeeCount: 3,
        totalTakeHomePay,
        isReversal: true,
        id: '9edb7d42-62cb-4f22-b387-fb522ba35137',
      },
    ];
    defaultState = getDefaultState();
    store = new TestStore(null, defaultState);
  });

  describe('totalTakeHomePay column', () => {
    it('should be shown with correct value', () => {
      defaultState.entries = sampleEntries;
      store.setState(defaultState);
      const wrapper = mount(
        <Provider store={store}>
          <PayRunListTable
            entries={sampleEntries}
            emptyMessage="Empty table"
            onSort={() => {}}
          ></PayRunListTable>
        </Provider>
      );
      const totalTakeHomePayRowItem = wrapper
        .find(Table.RowItem)
        .find({ columnName: 'Total take home pay ($)' });
      expect(totalTakeHomePayRowItem.exists()).toBe(true);
      expect(totalTakeHomePayRowItem.text()).toBe(
        formatCurrency(totalTakeHomePay)
      );
    });
  });
});
