import {
  DatePicker,
  Select,
} from '@myob/myob-widgets';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_PAY_PERIOD_DETAILS } from '../../../PayRunIntents';
import StartPayRunView from '../StartPayRunView';
import TestStore from '../../../../../../../store/TestStore';
import payRunReducer from '../../../payRunReducer';

describe('StartPayRunView', () => {
  let store;
  const props = {
    onPayPeriodChange: () => {},
    onNextButtonClick: () => {},
  };

  beforeEach(() => {
    store = new TestStore(payRunReducer);
  });

  afterEach(jest.clearAllMocks);

  const mountWithProvider = component => mount(component,
    { wrappingComponent: Provider, wrappingComponentProps: { store } });

  describe('when new pay frequency is selected', () => {
    const key = 'paymentFrequency';
    const value = 'Monthly';
    const emptyPeriodDate = '';

    beforeEach(() => {
      store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value });
    });

    it('should select pay frequency', () => {
      const wrapper = mountWithProvider(<StartPayRunView {...props} />);
      expect(wrapper.find({ testid: 'testPaymentFrequency' }).find(Select).prop('value')).toEqual(value);
    });

    it('should set all pay period dates to empty', () => {
      const wrapper = mountWithProvider(<StartPayRunView {...props} />);
      expect(wrapper.find({ testid: 'testPayPeriodStart' }).find(DatePicker).prop('value')).toEqual(emptyPeriodDate);
      expect(wrapper.find({ testid: 'testPayPeriodEnd' }).find(DatePicker).prop('value')).toEqual(emptyPeriodDate);
      expect(wrapper.find({ testid: 'testPayPeriodPaymentDate' }).find(DatePicker).prop('value')).toEqual(emptyPeriodDate);
    });
  });

  describe('when setting start pay period date', () => {
    it('should update end pay period and pay on dates', () => {
      const key = 'payPeriodStart';
      const expectedStartDate = '2020-06-01';
      const expectedEndDate = '2020-06-07';
      const expectedPaymentDate = '2020-06-08';

      store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value: expectedStartDate });

      const wrapper = mountWithProvider(<StartPayRunView {...props} />);

      expect(wrapper.find({ testid: 'testPayPeriodStart' }).find(DatePicker).prop('value')).toEqual(expectedStartDate);
      expect(wrapper.find({ testid: 'testPayPeriodEnd' }).find(DatePicker).prop('value')).toEqual(expectedEndDate);
      expect(wrapper.find({ testid: 'testPayPeriodPaymentDate' }).find(DatePicker).prop('value')).toEqual(expectedPaymentDate);
    });

    it('should not update other dates when end date is changed', () => {
      const key = 'payPeriodStart';
      const expectedStartDate = '2020-06-01';
      const expectedEndDate = '2020-06-07';
      const expectedPaymentDate = '2020-06-08';

      store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value: expectedStartDate });

      const wrapper = mountWithProvider(<StartPayRunView {...props} />);

      expect(wrapper.find({ testid: 'testPayPeriodStart' }).find(DatePicker).prop('value')).toEqual(expectedStartDate);
      expect(wrapper.find({ testid: 'testPayPeriodEnd' }).find(DatePicker).prop('value')).toEqual(expectedEndDate);
      expect(wrapper.find({ testid: 'testPayPeriodPaymentDate' }).find(DatePicker).prop('value')).toEqual(expectedPaymentDate);

      const newEndDate = '2020-07-07';
      const endDateKey = 'payPeriodEnd';

      store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key: endDateKey, value: newEndDate });

      wrapper.update();

      expect(wrapper.find({ testid: 'testPayPeriodStart' }).find(DatePicker).prop('value')).toEqual(expectedStartDate);
      expect(wrapper.find({ testid: 'testPayPeriodEnd' }).find(DatePicker).prop('value')).toEqual(newEndDate);
      expect(wrapper.find({ testid: 'testPayPeriodPaymentDate' }).find(DatePicker).prop('value')).toEqual(expectedPaymentDate);
    });

    it('should reset all pay period dates to empty when pay frequency is changed', () => {
      const key = 'payPeriodStart';
      const expectedStartDate = '2020-06-01';
      const expectedEndDate = '2020-06-07';
      const expectedPaymentDate = '2020-06-08';

      store.dispatch({ intent: SET_PAY_PERIOD_DETAILS, key, value: expectedStartDate });

      const wrapper = mountWithProvider(<StartPayRunView {...props} />);

      expect(wrapper.find({ testid: 'testPayPeriodStart' }).find(DatePicker).prop('value')).toEqual(expectedStartDate);
      expect(wrapper.find({ testid: 'testPayPeriodEnd' }).find(DatePicker).prop('value')).toEqual(expectedEndDate);
      expect(wrapper.find({ testid: 'testPayPeriodPaymentDate' }).find(DatePicker).prop('value')).toEqual(expectedPaymentDate);

      const paymentFrequencyKey = 'paymentFrequency';
      const paymentFrequencyValue = 'Monthly';
      const emptyPeriodDate = '';

      store.dispatch({
        intent: SET_PAY_PERIOD_DETAILS,
        key: paymentFrequencyKey,
        value: paymentFrequencyValue,
      });

      wrapper.update();

      expect(wrapper.find({ testid: 'testPayPeriodStart' }).find(DatePicker).prop('value')).toEqual(emptyPeriodDate);
      expect(wrapper.find({ testid: 'testPayPeriodEnd' }).find(DatePicker).prop('value')).toEqual(emptyPeriodDate);
      expect(wrapper.find({ testid: 'testPayPeriodPaymentDate' }).find(DatePicker).prop('value')).toEqual(emptyPeriodDate);
    });
  });
});
