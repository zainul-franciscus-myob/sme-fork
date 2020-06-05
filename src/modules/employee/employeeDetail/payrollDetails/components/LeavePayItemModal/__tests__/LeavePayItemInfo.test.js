import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { getLeavePayItemModalDefaultState } from '../../../reducer/LeavePayItemModalReducer';
import LeavePayItemInfo from '../LeavePayItemInfo';
import TestStore from '../../../../../../../store/TestStore';

describe('LeavePayItemModal.LeavePayItemInfo', () => {
  let leavePayItemModal = {};
  let store = {};
  let defaultState = {};
  beforeEach(() => {
    leavePayItemModal = getLeavePayItemModalDefaultState();
    defaultState = { leavePayItemModal };
    store = new TestStore(null, defaultState);
  });
  describe('carryRemainingLeave', () => {
    // test using simple component and passing props directly

    it('should be disabled when isCreating is false', () => {
      leavePayItemModal.leavePayItemId = '123';
      store.setState(defaultState);
      const wrapper = mount(
        <Provider store={store}>
          <LeavePayItemInfo />,
        </Provider>,
      );
      const carryRemainingLeave = wrapper
        .find({ name: 'carryRemainingLeave' })
        .first();
      expect(carryRemainingLeave.prop('disabled')).toBe(true);
    });

    // test using connected component and modified mockstate directly
    it('should be disabled when isCreating is true', () => {
      // mock new leave pay id
      leavePayItemModal.leavePayItemId = 'new';
      store.setState(defaultState);
      const wrapper = mount(
        <Provider store={store}>
          <LeavePayItemInfo />,
        </Provider>,
      );
      const carryRemainingLeave = wrapper
        .find({ name: 'carryRemainingLeave' })
        .first();
      expect(carryRemainingLeave.prop('disabled')).toBe(false);
    });
  });
});
