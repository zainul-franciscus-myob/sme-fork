import { mount } from 'enzyme';
import React from 'react';

import RecordPayRunIRFilingModal from '../RecordPayRunIRFilingModal';

describe('RecordPayRunIRFilingModal', () => {
  const props = {
    onGoBack: jest.fn(),
    onRecord: jest.fn(),
  };

  afterEach(jest.clearAllMocks);

  describe('Go back button', () => {
    it('should call goBack function when clicked', () => {
      const wrapper = mount(<RecordPayRunIRFilingModal {...props} />);
      const goBackButton = wrapper.find({ name: 'goBack' }).find('button');

      goBackButton.simulate('click');

      expect(props.onGoBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('When user is onboarded', () => {
    const updatedProps = {
      ...props,
      userOnboarded: true,
    };
    const wrapper = mount(<RecordPayRunIRFilingModal {...updatedProps} />);

    it('should display correct modal title', () => {
      expect(wrapper.find('ModalTitle').first().text()).toEqual(
        'Record pay run and file with IR'
      );
    });
    it('should display the correct image', () => {
      expect(wrapper.find({ name: 'irImage' }).exists()).toBe(true);
    });
    it('should not display an alert message', () => {
      expect(
        wrapper.find({ testid: 'userNotOnboardedModalAlert' }).length
      ).toEqual(0);
    });
    describe('Record and file button', () => {
      it('should call record function on click', () => {
        const recordAndFileButton = wrapper
          .find({ name: 'recordAndFile' })
          .find('button');

        recordAndFileButton.simulate('click');
        expect(recordAndFileButton.first().text()).toEqual('Record and file');

        expect(props.onRecord).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('When user is not onboarded', () => {
    const updatedProps = {
      ...props,
      userOnboarded: false,
    };
    const wrapper = mount(<RecordPayRunIRFilingModal {...updatedProps} />);

    it('should display correct modal title', () => {
      expect(wrapper.find('ModalTitle').first().text()).toEqual(
        'Record pay run without filing to IR'
      );
    });
    it('should display the correct image', () => {
      expect(wrapper.find({ name: 'recordImage' }).exists()).toBe(true);
    });
    it('should display an alert message', () => {
      expect(
        wrapper.find({ testid: 'userNotOnboardedModalAlert' }).length
      ).toEqual(1);
    });
    describe('Record button', () => {
      it('should call record function on click', () => {
        const recordWithoutFilingButton = wrapper
          .find({ name: 'recordWithoutFiling' })
          .find('button');

        recordWithoutFilingButton.simulate('click');
        expect(recordWithoutFilingButton.first().text()).toEqual(
          'Record without filing to IR'
        );
        expect(props.onRecord).toHaveBeenCalledTimes(1);
      });
    });
  });
});
