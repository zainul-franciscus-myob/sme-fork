import { shallow } from 'enzyme';
import React from 'react';

import JobMakerActionModal, {
  JobMakerActionCancelClaimModalBody,
  JobMakerActionCancelNominationModalBody,
  JobMakerActionClaimModalBody,
  JobMakerActionNominationModalBody,
  JobMakerActionUpdateEmployeeModalBody,
  generateModalConfig,
} from '../components/JobMakerActionModal';
import JobMakerActionTypes from '../JobMakerActionTypes';

describe('JobMakerActionNominationModalBody', () => {
  [
    {
      action: JobMakerActionTypes.Nominate,
      expected: false,
    },
    {
      action: JobMakerActionTypes.ReNominate,
      expected: true,
    },
  ].forEach(({ action, expected }) => {
    it(`has correct checkbox state ${
      expected ? 'checked' : 'unchecked'
    } when action is ${action}`, () => {
      const wrapper = shallow(
        <JobMakerActionNominationModalBody currentDropDownAction={action} />
      );

      expect(wrapper.find('Checkbox').prop('checked')).toEqual(expected);
    });
  });

  it(`unchecked the checkbox when action is not valid for the modal type`, () => {
    const wrapper = shallow(
      <JobMakerActionNominationModalBody
        currentDropDownAction={JobMakerActionTypes.Claim}
      />
    );
    expect(wrapper.find('Checkbox').prop('checked')).toEqual(false);
  });

  it('call onModalCheckboxChanged with correct action when checkbox changed', () => {
    const onModalCheckboxChanged = jest.fn();
    const action = JobMakerActionTypes.ReNominate;
    const wrapper = shallow(
      <JobMakerActionNominationModalBody
        onModalCheckboxChanged={onModalCheckboxChanged}
        currentDropDownAction={action}
      />
    );
    const checkbox = wrapper.find('Checkbox');
    checkbox.simulate('change');
    expect(onModalCheckboxChanged).toHaveBeenCalledWith(action);
  });
});

describe('JobMakerActionCancelNominationModalBody', () => {
  [
    {
      action: JobMakerActionTypes.CancelNominate,
      expected: false,
    },
    {
      action: JobMakerActionTypes.CancelReNominate,
      expected: true,
    },
  ].forEach(({ action, expected }) => {
    it(`has correct checkbox state ${
      expected ? 'checked' : 'unchecked'
    } when action is ${action}`, () => {
      const wrapper = shallow(
        <JobMakerActionCancelNominationModalBody
          currentDropDownAction={action}
        />
      );

      expect(wrapper.find('Checkbox').prop('checked')).toEqual(expected);
    });
  });

  it(`unchecked the checkbox when action is not valid for the modal type`, () => {
    const wrapper = shallow(
      <JobMakerActionCancelNominationModalBody
        currentDropDownAction={JobMakerActionTypes.CancelClaim}
      />
    );

    expect(wrapper.find('Checkbox').prop('checked')).toEqual(false);
  });

  it('call onModalCheckboxChanged with correct action when checkbox changed', () => {
    const onModalCheckboxChanged = jest.fn();
    const action = JobMakerActionTypes.CancelNominate;
    const wrapper = shallow(
      <JobMakerActionCancelNominationModalBody
        onModalCheckboxChanged={onModalCheckboxChanged}
        currentDropDownAction={action}
      />
    );
    const checkbox = wrapper.find('Checkbox');
    checkbox.simulate('change');
    expect(onModalCheckboxChanged).toHaveBeenCalledWith(action);
  });
});

describe('generateModalConfig', () => {
  [
    {
      action: JobMakerActionTypes.Claim,
      expected: <JobMakerActionClaimModalBody />,
    },
    {
      action: JobMakerActionTypes.CancelClaim,
      expected: <JobMakerActionCancelClaimModalBody />,
    },
    {
      action: JobMakerActionTypes.Nominate,
      expected: (
        <JobMakerActionNominationModalBody
          currentDropDownAction={JobMakerActionTypes.Nominate}
        />
      ),
    },
    {
      action: JobMakerActionTypes.ReNominate,
      expected: (
        <JobMakerActionNominationModalBody
          currentDropDownAction={JobMakerActionTypes.ReNominate}
        />
      ),
    },
    {
      action: JobMakerActionTypes.CancelNominate,
      expected: (
        <JobMakerActionCancelNominationModalBody
          currentDropDownAction={JobMakerActionTypes.CancelNominate}
        />
      ),
    },
    {
      action: JobMakerActionTypes.CancelReNominate,
      expected: (
        <JobMakerActionCancelNominationModalBody
          currentDropDownAction={JobMakerActionTypes.CancelReNominate}
        />
      ),
    },
    {
      action: JobMakerActionTypes.UpdateEmployee,
      expected: (
        <JobMakerActionUpdateEmployeeModalBody
          currentDropDownAction={JobMakerActionTypes.UpdateEmployee}
        />
      ),
    },
    {
      action: JobMakerActionTypes.UpdateEmployeeReNominate,
      expected: (
        <JobMakerActionUpdateEmployeeModalBody
          currentDropDownAction={JobMakerActionTypes.UpdateEmployeeReNominate}
        />
      ),
    },
  ].forEach(({ action, expected }) => {
    it(`should generate correct modal body for action type ${action} `, () => {
      const { body } = generateModalConfig(action);

      expect(body).toEqual(expected);
    });
  });
});

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
        dropDownAction={JobMakerActionTypes.Claim}
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
