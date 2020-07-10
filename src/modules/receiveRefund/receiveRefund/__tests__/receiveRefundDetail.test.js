import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import ReceiveRefundDetail from '../components/ReceiveRefundDetail';
import Store from '../../../../store/Store';
import receiveRefundReducer from '../receiveRefundReducer';

describe('receiveRefundDetail', () => {
  it('should limit receive refund to 13 characters', () => {
    const store = new Store(receiveRefundReducer);
    const wrapper = mount(
      <Provider store={store}>
        <ReceiveRefundDetail />
      </Provider>
    );
    const referenceIdInput = wrapper.find({ name: 'referenceId' }).first();
    expect(referenceIdInput.prop('maxLength')).toBe(13);
  });
});
