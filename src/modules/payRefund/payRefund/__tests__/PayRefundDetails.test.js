import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import PayRefundDetail from '../components/PayRefundDetail';
import Store from '../../../../store/Store';
import payRefundReducer from '../payRefundReducer';

describe('payRefundDetail', () => {
  it('should limit pay refund  number to 13 characters', () => {
    const store = new Store(payRefundReducer);
    const wrapper = mount(
      <Provider store={store}>
        <PayRefundDetail />
      </Provider>,
    );
    const payRefundInput = wrapper.find({ name: 'referenceId' }).first();
    expect(payRefundInput.prop('maxLength')).toBe(13);
  });
});
