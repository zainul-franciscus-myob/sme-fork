import { Label, Table } from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { getDefaultState } from '../../payRunListReducer';
import PayRunListTable from '../PayRunListTable';
import TestStore from '../../../../../store/TestStore';
import formatCurrency from '../../../../../common/valueFormatters/formatCurrency';

const totalNetPay = 1663.59;
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
        totalNetPay,
        isReversal: true,
        id: '9edb7d42-62cb-4f22-b387-fb522ba35137',
      },
    ];
    defaultState = getDefaultState();
    store = new TestStore(null, defaultState);
  });
  describe('isReversal column', () => {
    it('should be shown when there is a reversal in list of entries', () => {
      defaultState.entries = [...sampleEntries];
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
      const reversalLabel = wrapper.find(Label).find('.boxed.orange');
      expect(reversalLabel.exists()).toBe(true);
    });

    it('should be hidden  when there is no reversal in list of entries', () => {
      defaultState.entries = [{ ...sampleEntries[0], isReversal: false }];
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
      const reversalLabel = wrapper.find(Label).find('.boxed.orange');
      expect(reversalLabel.exists()).toBe(false);
    });
  });

  describe('totalNetpay column', () => {
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
      const totalNetPayRowItem = wrapper
        .find(Table.RowItem)
        .find({ columnName: 'Total net pay ($)' });
      expect(totalNetPayRowItem.exists()).toBe(true);
      expect(totalNetPayRowItem.text()).toBe(formatCurrency(totalNetPay));
    });
  });
});
