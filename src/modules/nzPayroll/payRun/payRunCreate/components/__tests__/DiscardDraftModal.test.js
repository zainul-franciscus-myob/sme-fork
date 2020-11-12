import { mount } from 'enzyme';
import React from 'react';

import PreviousStepModal from '../DiscardDraftModal';

describe('PreviousStepModal', () => {
  const props = {
    onGoBack: jest.fn(),
    onDiscard: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('Go back button', () => {
    it('should call goBack function when clicked', () => {
      const wrapper = mount(<PreviousStepModal {...props} />);
      const goBackButton = wrapper.find({ name: 'goBack' }).find('button');

      goBackButton.simulate('click');

      expect(props.onGoBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Discard button', () => {
    it('should call discard function on click', () => {
      const wrapper = mount(<PreviousStepModal {...props} />);
      const discardButton = wrapper.find({ name: 'discard' }).find('button');

      discardButton.simulate('click');

      expect(props.onDiscard).toHaveBeenCalledTimes(1);
    });
  });
});
