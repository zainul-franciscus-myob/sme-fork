import { shallow } from 'enzyme';
import React from 'react';

import JobMakerNominationModal from '../components/JobMakerNominationModal';

describe('JobMakerNominationModal', () => {
  let wrapper;
  let onNominate;
  let onCloseModal;
  beforeEach(() => {
    onNominate = jest.fn();
    onCloseModal = jest.fn();
    wrapper = shallow(
      <JobMakerNominationModal
        onNominate={onNominate}
        onCloseModal={onCloseModal}
      />
    );
  });

  it('should call onNominate when Nominate button is clicked', () => {
    const nominateButton = wrapper.find({
      testid: 'jobmaker-nomination-modal-nominate-btn',
    });
    nominateButton.simulate('click');
    expect(onNominate).toHaveBeenCalled();
    expect(onCloseModal).not.toHaveBeenCalled();
  });
  it('should call onCloseModal when modal cancel button is clicked', () => {
    const nominateButton = wrapper.find({
      testid: 'jobmaker-nomination-modal-cancel-btn',
    });
    nominateButton.simulate('click');
    expect(onNominate).not.toHaveBeenCalled();
    expect(onCloseModal).toHaveBeenCalled();
  });
});
