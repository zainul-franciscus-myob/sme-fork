import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import EmployeePayHeader from '../EmployeePayHeader';
import TestStore from '../../../../../../store/TestStore';
import payRunReducer from '../../payRunReducer';

describe('EmployeePayHeader', () => {
  let store;

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  const mountWithProvider = (component) =>
    mount(component, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store },
    });

  describe('when EmployeePayHeader is rendered', () => {
    it('should display all employee pay information when available', () => {
      const startPayRun = {
        currentEditingPayRun: {
          paymentFrequency: 'fortnightly',
          paymentDate: '2019-10-28',
          payPeriodStart: '2019-10-21',
          payPeriodEnd: '2019-10-27',
        },
      };
      const totalTakeHomePay = 1000;

      const expected = {
        paymentFrequency: 'fortnightly',
        paymentDate: 'Mon 28/10/2019',
        payPeriodStart: 'Mon 21/10/2019',
        payPeriodEnd: 'Sun 27/10/2019',
        totalTakeHomePay: '1000',
      };

      store.setState({
        ...store.getState(),
        startPayRun,
        totalTakeHomePay,
      });

      const wrapper = mountWithProvider(<EmployeePayHeader />);
      expect(wrapper.find({ testid: 'test-payment-frequency' }).text()).toEqual(
        expected.paymentFrequency
      );
      expect(wrapper.find({ testid: 'test-period-start' }).text()).toEqual(
        expected.payPeriodStart
      );
      expect(wrapper.find({ testid: 'test-period-end' }).text()).toEqual(
        expected.payPeriodEnd
      );
      expect(wrapper.find({ testid: 'test-payment-date' }).text()).toEqual(
        expected.paymentDate
      );
      expect(wrapper.find({ testid: 'test-take-home-pay' }).text()).toEqual(
        `$${expected.totalTakeHomePay}`
      );
    });

    it('should not display total take home pay when empty', () => {
      const startPayRun = {
        currentEditingPayRun: {
          paymentFrequency: 'fortnightly',
          paymentDate: '2019-10-28',
          payPeriodStart: '2019-10-21',
          payPeriodEnd: '2019-10-27',
        },
      };

      const expected = {
        paymentFrequency: 'fortnightly',
        paymentDate: 'Mon 28/10/2019',
        payPeriodStart: 'Mon 21/10/2019',
        payPeriodEnd: 'Sun 27/10/2019',
        totalTakeHomePay: '1000',
      };

      store.setState({
        ...store.getState(),
        startPayRun,
      });

      const wrapper = mountWithProvider(<EmployeePayHeader />);
      expect(wrapper.find({ testid: 'test-payment-frequency' }).text()).toEqual(
        expected.paymentFrequency
      );
      expect(wrapper.find({ testid: 'test-period-start' }).text()).toEqual(
        expected.payPeriodStart
      );
      expect(wrapper.find({ testid: 'test-period-end' }).text()).toEqual(
        expected.payPeriodEnd
      );
      expect(wrapper.find({ testid: 'test-payment-date' }).text()).toEqual(
        expected.paymentDate
      );
      expect(wrapper.find({ testid: 'test-take-home-pay' }).exists()).toBe(
        false
      );
    });

    it('should display empty employee pay information if empty', () => {
      const startPayRun = {
        currentEditingPayRun: {
          paymentFrequency: '',
          paymentDate: '',
          payPeriodStart: '',
          payPeriodEnd: '',
        },
      };
      const totalTakeHomePay = '';

      store.setState({
        ...store.getState(),
        startPayRun,
        totalTakeHomePay,
      });

      const wrapper = mountWithProvider(<EmployeePayHeader />);
      expect(wrapper.find({ testid: 'test-payment-frequency' }).text()).toEqual(
        ''
      );
      expect(wrapper.find({ testid: 'test-period-start' }).text()).toEqual('');
      expect(wrapper.find({ testid: 'test-period-end' }).text()).toEqual('');
      expect(wrapper.find({ testid: 'test-payment-date' }).text()).toEqual('');
      expect(wrapper.find({ testid: 'test-take-home-pay' }).exists()).toBe(
        false
      );
    });
  });
});
