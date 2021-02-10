import { mount } from 'enzyme';
import React from 'react';

import InlandRevenueSettingsActions from '../InlandRevenueSettingsActions';

describe('InlandRevenueSettingsActions', () => {
  describe('<ButtonRow>', () => {
    it('should call onRemoveAuthorisationClick when clicked', () => {
      const props = {
        isUserAuthorised: true,
        onRemoveAuthorisationClick: jest.fn(),
      };

      const wrapper = mount(<InlandRevenueSettingsActions {...props} />);
      const removeAuthorisationButton = wrapper.find('button');

      removeAuthorisationButton.simulate('click');

      expect(removeAuthorisationButton.text()).toEqual('Remove authorisation');
      expect(props.onRemoveAuthorisationClick).toHaveBeenCalledTimes(1);
    });

    it('should call onAuthoriseClick when clicked', () => {
      const props = {
        isUserAuthorised: false,
        onAuthoriseClick: jest.fn(),
      };

      const wrapper = mount(<InlandRevenueSettingsActions {...props} />);
      const authoriseButton = wrapper.find('button');

      authoriseButton.simulate('click');

      expect(authoriseButton.text()).toEqual('Authorise MYOB');
      expect(props.onAuthoriseClick).toHaveBeenCalledTimes(1);
    });
  });
});
