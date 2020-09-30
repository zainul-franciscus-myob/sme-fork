import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { LOAD_EMPLOYEE_DETAIL } from '../../../../EmployeeNzIntents';
import LeaveTabView from '../LeaveTabView';
import TestStore from '../../../../../../../store/TestStore';
import employeeDetail from '../../../../mappings/data/employeeDetailEntry';
import employeeDetailNzReducer from '../../../employeeDetailNzReducer';

describe('LeaveTabView', () => {
  let store;
  beforeEach(() => {
    store = new TestStore(employeeDetailNzReducer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  const setup = () => {
    store.dispatch({ intent: LOAD_EMPLOYEE_DETAIL, payload: employeeDetail });
    const onLeaveChange = jest.fn();
    const wrapper = mountWithProvider(
      <LeaveTabView onLeaveChange={onLeaveChange} />
    );
    return { wrapper, onLeaveChange };
  };

  it('should render LeaveTabView', () => {
    const { wrapper } = setup();

    const view = wrapper.find('LeaveTabView');

    expect(view).toHaveLength(1);
  });

  it('should have proper props', () => {
    const { wrapper } = setup();
    const { leave } = employeeDetail.payrollDetails;

    const view = wrapper.find('LeaveTabView');

    expect(view.props()).toMatchObject({ leave });
  });

  it('should have proper props', () => {
    const { wrapper } = setup();
    const { leave } = employeeDetail.payrollDetails;

    const view = wrapper.find('LeaveTabView');

    expect(view.props()).toMatchObject({ leave });
  });

  describe('LeaveTabView fields', () => {
    const { holidayPay, leave } = employeeDetail.payrollDetails;

    it.each([
      {
        label: 'Holiday pay (%)',
        name: 'holidayPay',
        data: holidayPay.holidayPayRate,
      },
      {
        label: 'Annual entitlement (days)',
        name: 'sickLeaveAnnualEntitlement',
        data: leave.sickLeaveAnnualEntitlement,
      },
      {
        label: 'Maximum to accure (days)',
        name: 'sickLeaveMaximumToAccure',
        data: leave.sickLeaveMaximumToAccure,
      },
      {
        label: 'Opening balance (days)',
        name: 'sickLeaveOpeningBalance',
        data: leave.sickLeaveOpeningBalance,
      },
      {
        label: 'Opening balance (days)',
        name: 'alternativeOpeningBalance',
        data: leave.alternativeOpeningBalance,
      },
    ])('AmountInput Field: %p', ({ label, name, data }) => {
      const { wrapper } = setup();

      const field = wrapper.find({ name }).find('AmountInput');

      expect(field.props()).toMatchObject({
        label,
        name,
        value: data,
      });
    });

    it.each([
      {
        label: 'Current balance (days)',
        name: 'sickLeaveCurrentBalance',
        data: leave.sickLeaveCurrentBalance,
      },
      {
        label: 'Current balance (days)',
        name: 'alternativeCurrentBalance',
        data: leave.alternativeCurrentBalance,
      },
    ])('ReadOnly Field: %p', ({ label, name, data }) => {
      const { wrapper } = setup();

      const field = wrapper.find({ name }).find('ReadOnly');

      expect(field.props()).toMatchObject({
        label,
        name,
        children: data,
      });
    });

    it('Datepicker should render with proper props', () => {
      const { wrapper } = setup();

      const field = wrapper.find('DatePicker');

      expect(field.props()).toMatchObject({
        name: 'nextAnniversaryDate',
        label: 'Next anniversary date',
        value: leave.nextAnniversaryDate,
      });
    });
  });

  describe('LeaveTabView input fields calls onLeaveChange on user interaction', () => {
    it.each([
      'holidayPay',
      'sickLeaveAnnualEntitlement',
      'sickLeaveMaximumToAccure',
      'sickLeaveOpeningBalance',
      'alternativeOpeningBalance',
    ])('AmountInput Field: %p', (name) => {
      const { wrapper, onLeaveChange } = setup();
      const field = wrapper.find({ name }).find('AmountInput');

      field.props().onChange({ target: { name, value: '5' } });

      expect(onLeaveChange).toHaveBeenCalledTimes(1);
    });

    it('Datepicker calls onLeaveChange when selecting the date', () => {
      const { wrapper, onLeaveChange } = setup();
      const field = wrapper.find('DatePicker');

      field
        .props()
        .onSelect({ target: { fieldName: 'nextAnniversaryDate', value: '' } });

      expect(onLeaveChange).toHaveBeenCalledTimes(1);
    });

    it('HolidayPay field is disabled', () => {
      const { wrapper } = setup();

      const field = wrapper.find({ name: 'holidayPay' }).find('AmountInput');
      const isDisabled = field.props().disabled;

      expect(isDisabled).toBeTruthy();
    });
  });
});
