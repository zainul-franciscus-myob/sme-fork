import { shallow } from 'enzyme';
import React from 'react';

import JobMakerActionModal from '../components/JobMakerActionModal';

describe('JobMakerNominationModal', () => {
  let wrapper;
  let onConfirmAction;
  let onCloseModal;
  beforeEach(() => {
    onConfirmAction = jest.fn();
    onCloseModal = jest.fn();
    wrapper = shallow(
      <JobMakerActionModal
        onConfirmAction={onConfirmAction}
        onCloseModal={onCloseModal}
      />
    );
  });

  it('should call onConfirmAction when action confirm button is clicked', () => {
    const testButton = wrapper.find({
      testid: 'jobmaker-action-modal-action-btn',
    });

    testButton.simulate('click');

    expect(onConfirmAction).toHaveBeenCalled();
    expect(onCloseModal).not.toHaveBeenCalled();
  });

  it('should call onCloseModal when modal cancel button is clicked', () => {
    const testButton = wrapper.find({
      testid: 'jobmaker-action-modal-cancel-btn',
    });

    testButton.simulate('click');

    expect(onConfirmAction).not.toHaveBeenCalled();
    expect(onCloseModal).toHaveBeenCalled();
  });
});
