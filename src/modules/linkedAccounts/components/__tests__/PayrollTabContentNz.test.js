import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_SELECTED_TAB } from '../../LinkedAccountsIntents';
import PayrollTabContentNz from '../PayrollTabContentNz';
import TabItem from '../../TabItem';
import TestStore from '../../../../store/TestStore';
import linkedAccountsReducer from '../../linkedAccountsReducer';

let store;
beforeEach(() => {
  store = new TestStore(linkedAccountsReducer);
});

const props = {
  onAccountChange: jest.fn(),
  onCreateAccountButtonClick: jest.fn(),
};

const setup = () => {
  store.state.region = 'nz';
  store.dispatch({ intent: SET_SELECTED_TAB, selectedTab: TabItem.PAYROLL });

  return mount(<PayrollTabContentNz {...props} />, {
    wrappingComponent: Provider,
    wrappingComponentProps: { store, onEmploymentDetailsChange: jest.fn() },
  });
};

describe('PayrollTabContentNz', () => {
  it('component should be rendered', () => {
    const wrapper = setup();

    const payrollTab = wrapper.find(PayrollTabContentNz);

    expect(payrollTab).toHaveLength(1);
  });

  it.each([
    ['Bank account for cash payments'],
    ['Bank account for cheque payments'],
    ['Bank account for electronic payments'],
    ['Default wages expense account'],
    ['Default KiwiSaver expense account'],
    ['Default Employer Deductions Payable account'],
    ['Default Other Deductions Payable account'],
  ])('should render %p combobox)', (label) => {
    const wrapper = setup();

    const view = wrapper.find('PayrollTabContentNz').find('AccountCombobox');

    expect(view.find({ label }).exists()).toBeTruthy();
  });

  it('should have NZ props', () => {
    const wrapper = setup();

    const payrollTab = wrapper.find('PayrollTabContentNz');

    expect(payrollTab.props()).toHaveProperty('bankAccountCashPayments');
    expect(payrollTab.props()).toHaveProperty('bankAccountChequePayments');
    expect(payrollTab.props()).toHaveProperty('bankAccountElectronicPayments');
    expect(payrollTab.props()).toHaveProperty('wagesExpenseAccount');
    expect(payrollTab.props()).toHaveProperty('kiwiSaverExpenseAccount');
    expect(payrollTab.props()).toHaveProperty(
      'employerDeductionsPayableAccount'
    );
    expect(payrollTab.props()).toHaveProperty('otherDeductionsPayableAccount');
  });

  it.each([
    ['Bank account for cash payments', 'bankAccountCashPayments'],
    ['Bank account for cheque payments', 'bankAccountChequePayments'],
    ['Bank account for electronic payments', 'bankAccountElectronicPayments'],
    ['Default wages expense account', 'wagesExpenseAccount'],
    ['Default KiwiSaver expense account', 'kiwiSaverExpenseAccount'],
    [
      'Default Employer Deductions Payable account',
      'employerDeductionsPayableAccount',
    ],
    [
      'Default Other Deductions Payable account',
      'otherDeductionsPayableAccount',
    ],
  ])(
    ' %p combobox should execute the onAccountChange callback )',
    (label, key) => {
      const wrapper = setup();
      const field = wrapper
        .find('PayrollTabContentNz')
        .find({ label })
        .find('AccountCombobox');

      field.props().onChange({});

      expect(props.onAccountChange).toHaveBeenCalledWith({
        value: String.any,
        key,
      });
    }
  );
});
