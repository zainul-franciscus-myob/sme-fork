import { mount } from 'enzyme';
import React from 'react';

import RecordPayRunWithIRFilingModal from '../RecordPayRunWithIRFilingModal';

describe('RecordPayRunWithIRFilingModal', () => {
  const props = {
    onGoBack: jest.fn(),
    onRecordAndFile: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('Go back button', () => {
    it('should call goBack function when clicked', () => {
      const wrapper = mount(<RecordPayRunWithIRFilingModal {...props} />);
      const goBackButton = wrapper.find({ name: 'goBack' }).find('button');

      goBackButton.simulate('click');

      expect(props.onGoBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Record and file button', () => {
    it('should call discard function on click', () => {
      const wrapper = mount(<RecordPayRunWithIRFilingModal {...props} />);
      const recordAndFile = wrapper
        .find({ name: 'recordAndFile' })
        .find('button');

      recordAndFile.simulate('click');

      expect(props.onRecordAndFile).toHaveBeenCalledTimes(1);
    });
  });
});
