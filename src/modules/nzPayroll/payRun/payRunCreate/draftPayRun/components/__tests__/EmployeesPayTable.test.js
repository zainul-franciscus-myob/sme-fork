import { Provider } from 'react-redux';
import { Table } from '@myob/myob-widgets';
import { mount } from 'enzyme';
import React from 'react';

import {
  LOAD_DRAFT_PAY_RUN,
  UPDATE_IS_EMPLOYEE_SELECTED,
} from '../../../PayRunIntents';
import EmployeePayTable from '../EmployeesPayTable';
import TestStore from '../../../../../../../store/TestStore';
import createdDraftPayRun from '../../__tests__/fixtures/createDraftPayRun';
import payRunReducer from '../../../payRunReducer';

describe('EmployeePayTable', () => {
  let store;
  const props = {};

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('on table load', () => {
    it('should have headers in correct order', () => {
      const wrapper = mountWithProvider(<EmployeePayTable {...props} />);

      const expected = [
        'Employee',
        'Days paid ',
        'Gross ($)',
        'PAYE ($)',
        'KiwiSaver ($)',
        'Take home pay ($)',
      ];
      const actual = wrapper
        .find({ testClass: 'column-type-test-class' })
        .find(Table.HeaderItem)
        .map((x) => x.text());

      expect(actual).toEqual(expected);
    });

    it('should render employee line with correct values', () => {
      const wrapper = mountWithProvider(<EmployeePayTable {...props} />);
      const action = {
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun,
      };
      store.dispatch(action);
      wrapper.update();
      const employeeRow = wrapper
        .find({ testId: 'employee-21-row' })
        .find({ testClass: 'column-type-test-class' })
        .find(Table.RowItem);
      const employeeRowTexts = employeeRow.map((x) => x.text());

      const expected = [
        'Mary Jones',
        '5',
        '1,500.00',
        '110.00',
        '50.00',
        '700.00',
      ];

      expect(employeeRowTexts).toEqual(expected);
    });
  });

  describe('Totals line', () => {
    it('should render totals line with correct values', () => {
      const wrapper = mountWithProvider(<EmployeePayTable {...props} />);
      const action = {
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun,
      };
      store.dispatch(action);
      wrapper.update();
      const totalsRow = wrapper
        .find({ testId: 'totals-row-test-id' })
        .find({ testClass: 'totals-row-item-test-class' })
        .find(Table.RowItem);
      const totalsRowTextValues = totalsRow.map((x) => x.text());

      const expected = ['2,900.00', '200.00', '80.00', '1,400.00'];

      expect(totalsRowTextValues).toEqual(expected);
    });

    it('should render totals only of selected employees', () => {
      const wrapper = mountWithProvider(<EmployeePayTable {...props} />);
      const action = {
        intent: LOAD_DRAFT_PAY_RUN,
        createdDraftPayRun,
      };
      store.dispatch(action);

      const deselectAction = {
        intent: UPDATE_IS_EMPLOYEE_SELECTED,
        id: 22,
      };
      store.dispatch(deselectAction);

      wrapper.update();
      const totalsRow = wrapper
        .find({ testId: 'totals-row-test-id' })
        .find({ testClass: 'totals-row-item-test-class' })
        .find(Table.RowItem);
      const totalsRowTextValues = totalsRow.map((x) => x.text());

      const expected = ['1,500.00', '110.00', '50.00', '700.00'];

      expect(totalsRowTextValues).toEqual(expected);
    });
  });
});
