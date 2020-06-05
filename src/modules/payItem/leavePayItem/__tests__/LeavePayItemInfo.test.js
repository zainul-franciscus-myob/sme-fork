import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { getDefaultState } from '../leavePayItemReducer';
import LeavePayItemInfo from '../component/LeavePayItemInfo';
import TestStore from '../../../../store/TestStore';

describe('LeavePayItemInfo', () => {
  let defaultState = {};
  let store = {};
  beforeEach(() => {
    defaultState = getDefaultState();
    store = new TestStore(null, defaultState);
  });
  describe('carryRemainingLeave', () => {
    // test using simple component and passing props directly

    it('should be disabled when isCreating is false', () => {
      defaultState.leavePayItemId = '123';
      store.setState(defaultState);
      const wrapper = mount(
        <Provider store={store}>
          <LeavePayItemInfo />
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
      defaultState.leavePayItemId = 'new';
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
