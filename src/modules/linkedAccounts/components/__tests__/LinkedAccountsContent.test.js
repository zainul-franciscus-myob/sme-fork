import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_SELECTED_TAB } from '../../LinkedAccountsIntents';
import LinkedAccountsContent from '../LinkedAccountsContent';
import PayrollTabContent from '../PayrollTabContent';
import PayrollTabContentNz from '../PayrollTabContentNz';
import TabItem from '../../TabItem';
import TestStore from '../../../../store/TestStore';
import linkedAccountsReducer from '../../linkedAccountsReducer';

describe('LinkedAccountsContent', () => {
  let store;
  beforeEach(() => {
    store = new TestStore(linkedAccountsReducer);
  });

  const setup = (isNzBusiness = false) => {
    if (isNzBusiness) store.state.region = 'nz';

    store.dispatch({ intent: SET_SELECTED_TAB, selectedTab: TabItem.PAYROLL });

    return mount(<LinkedAccountsContent />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });
  };

  describe('when region is AU', () => {
    it('PayrollTabContent component should be rendered', () => {
      const wrapper = setup();

      const payrollTab = wrapper.find(PayrollTabContent);

      expect(payrollTab).toHaveLength(1);
    });

    it('PayrollTab should not have NZ props', () => {
      const wrapper = setup();

      const payrollTab = wrapper.find('PayrollTabContent');

      expect(payrollTab.props()).not.toHaveProperty('kiwiSaverExpenseAccount');
      expect(payrollTab.props()).not.toHaveProperty(
        'taxDeductionsPayableAccount:'
      );
      expect(payrollTab.props()).not.toHaveProperty(
        'otherDeductionsPayableAccount'
      );
    });

    it.each([
      ['Default KiwiSaver expense account'],
      ['Default Employer Deductions Payable account'],
      ['Default Other Deductions Payable account'],
    ])('PayrollTab should not have %p)', (label) => {
      const wrapper = setup();

      const view = wrapper.find('PayrollTabContent').find('AccountCombobox');

      expect(view.find({ label }).exists()).toBeFalsy();
    });
  });

  describe('when region is NZ', () => {
    it('PayrollTabContentNz component should be rendered', () => {
      const wrapper = setup(true);

      const payrollTab = wrapper.find(PayrollTabContentNz);

      expect(payrollTab).toHaveLength(1);
    });

    it('PayrollTab should have NZ props', () => {
      const wrapper = setup(true);

      const payrollTab = wrapper.find('PayrollTabContentNz');

      expect(payrollTab.props()).toHaveProperty('bankAccountCashPayments');
      expect(payrollTab.props()).toHaveProperty('bankAccountChequePayments');
      expect(payrollTab.props()).toHaveProperty(
        'bankAccountElectronicPayments'
      );
      expect(payrollTab.props()).toHaveProperty('wagesExpenseAccount');
      expect(payrollTab.props()).toHaveProperty('kiwiSaverExpenseAccount');
      expect(payrollTab.props()).toHaveProperty(
        'employerDeductionsPayableAccount'
      );
      expect(payrollTab.props()).toHaveProperty(
        'otherDeductionsPayableAccount'
      );
    });

    it.each([
      ['Bank account for cash payments'],
      ['Bank account for cheque payments'],
      ['Bank account for electronic payments'],
      ['Default wages expense account'],
      ['Default KiwiSaver expense account'],
      ['Default Employer Deductions Payable account'],
      ['Default Other Deductions Payable account'],
    ])('PayrollTab should render %p combobox)', (label) => {
      const wrapper = setup();

      const view = wrapper.find('PayrollTabContentNz').find('AccountCombobox');

      expect(view.find({ label }).exists()).toBeTruthy();
    });
  });
});
