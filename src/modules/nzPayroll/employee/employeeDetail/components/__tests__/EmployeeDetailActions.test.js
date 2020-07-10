import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';

import { SET_SAVING_STATE } from '../../../EmployeeNzIntents';
import EmployeeDetailActions from '../EmployeeDetailActions';
import Store from '../../../../../../store/Store';
import employeeDetailNzReducer from '../../employeeDetailNzReducer';

describe('EmployeeDetailActions', () => {
  describe('<ButtonRow/>', () => {
    let store;
    let wrapper;
    beforeEach(() => {
      store = new Store(employeeDetailNzReducer);
      wrapper = mount(<EmployeeDetailActions />, {
        wrappingComponent: Provider,
        wrappingComponentProps: { store },
      });
    });

    it('should render 3 buttons', () => {
      expect(wrapper.find('Button').length).toEqual(3);
    });

    it('delete button should have proper props', () => {
      const deleteButton = wrapper.find({ name: 'delete' }).find('Button');

      expect(deleteButton.props()).toMatchObject({
        disabled: false,
        type: 'secondary',
        onClick: expect.any(Function),
      });
    });

    it('cancel button should have proper props', () => {
      const deleteButton = wrapper.find({ name: 'cancel' }).find('Button');

      expect(deleteButton.props()).toMatchObject({
        disabled: false,
        type: 'secondary',
        onClick: expect.any(Function),
      });
    });

    it('save button should have proper props', () => {
      const deleteButton = wrapper.find({ name: 'save' }).find('Button');

      expect(deleteButton.props()).toMatchObject({
        disabled: false,
        type: 'primary',
        onClick: expect.any(Function),
      });
    });

    it('all action buttons should be disabled when saving', () => {
      store.dispatch({ intent: SET_SAVING_STATE });
      wrapper.update();
      const bottons = wrapper.find('Button');

      expect(bottons.at(0).props()).toMatchObject({ disabled: true });
      expect(bottons.at(1).props()).toMatchObject({ disabled: true });
      expect(bottons.at(2).props()).toMatchObject({ disabled: true });
    });
  });
});
