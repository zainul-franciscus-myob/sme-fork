import { mount } from 'enzyme';
import React from 'react';

import RemoveAuthorisationModal from '../RemoveAuthorisationModal';

describe('RemoveAuthorisationModal', () => {
  const props = {
    onCancel: jest.fn(),
    onModalRemoveAuthorisation: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('Cancel button', () => {
    it('should call the cancel function when clicked', () => {
      const wrapper = mount(<RemoveAuthorisationModal {...props} />);
      const cancelButton = wrapper.find({ name: 'cancel' }).find('button');

      cancelButton.simulate('click');

      expect(props.onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Remove authorisation button', () => {
    it('should call the remove authorisation function when clicked', () => {
      const wrapper = mount(<RemoveAuthorisationModal {...props} />);
      const removeAuthButton = wrapper
        .find({ name: 'removeAuth' })
        .find('button');

      removeAuthButton.simulate('click');

      expect(props.onModalRemoveAuthorisation).toHaveBeenCalledTimes(1);
    });
  });

  describe('Remove authorisation description', () => {
    it('should render the correct message when user is last onboarded for the business', () => {
      const updatedProps = {
        ...props,
        multipleUsersOnboarded: false,
      };
      const wrapper = mount(<RemoveAuthorisationModal {...updatedProps} />);
      const removeAuthMessage = wrapper.find('RemoveLastOnboardedUserMessage');
      expect(removeAuthMessage).toHaveLength(1);
    });
    it('should render the correct message when user is not last onboarded for the business', () => {
      const updatedProps = {
        ...props,
        multipleUsersOnboarded: true,
      };
      const wrapper = mount(<RemoveAuthorisationModal {...updatedProps} />);
      const removeAuthMessage = wrapper.find('RemoveOnboardedUserMessage');
      expect(removeAuthMessage).toHaveLength(1);
    });
  });
});
