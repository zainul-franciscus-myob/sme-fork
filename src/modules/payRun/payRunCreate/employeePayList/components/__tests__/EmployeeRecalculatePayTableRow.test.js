import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import EmployeeRecalculatePayTableRow from '../EmployeeRecalculatePayTableRow';
import TestStore from '../../../../../../store/TestStore';

describe('EmployeeRecalculatePayTableRow', () => {
  const employeeId = 1;
  const key = 'amount';
  const payItemId = 22;
  const employeePayList = {};
  const initialState = {};
  const tableConfig = {
    name: 'sample',
  };
  const entry = {
    hours: 20,
    amount: 10,
    payItemId,
    payItemName: '',
    isSubmitting: true,
  };
  const props = { entry, employeeId, tableConfig };

  beforeEach(() => {
    employeePayList.modifyingEmployeeId = employeeId;
    employeePayList.modifyingPayItemId = payItemId;
    employeePayList.modifyingKey = key;
    initialState.employeePayList = employeePayList;
  });

  it('render spinner when is submitting and modifying attribute match the components', () => {
    entry.isSubmitting = true;
    const store = new TestStore(null, initialState);
    const component = mount(
      <Provider store={store}>
        <EmployeeRecalculatePayTableRow {...props} />
      </Provider>
    );
    const spinners = component.find('Spinner');

    expect(spinners.length).toBe(1);
  });
  it('does not render spinner when is submitting is false', () => {
    entry.isSubmitting = false;
    const store = new TestStore(null, initialState);
    const component = mount(
      <Provider store={store}>
        <EmployeeRecalculatePayTableRow {...props} />
      </Provider>
    );
    const spinners = component.find('Spinner');
    expect(spinners.length).toBe(0);
  });
  ['modifyingEmployeeId', 'modifyingPayItemId', 'modifyingKey'].forEach(
    (attribute) => {
      it(`does not render spinner when is submitting is true but ${attribute} is null`, () => {
        initialState.employeePayList[attribute] = null;
        entry.isSubmitting = true;
        const store = new TestStore(null, initialState);
        const component = mount(
          <Provider store={store}>
            <EmployeeRecalculatePayTableRow {...props} />
          </Provider>
        );
        const spinners = component.find('Spinner');
        expect(spinners.length).toBe(0);
      });
    }
  );
});
