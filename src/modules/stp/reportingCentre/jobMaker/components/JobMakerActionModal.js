import { Button, Checkbox, Modal } from '@myob/myob-widgets';
import React from 'react';

import JobMakerActionTypes from '../JobMakerActionTypes';

export const JobMakerActionClaimModalBody = () => (
  <div>
    <p>
      I declare that the employee has worked on average more than 20 hours per
      week across the claim period.
    </p>
    Visit our{' '}
    <a
      href="https://help.myob.com/wiki/x/mAaFAw#expand-4Declareemployeeeligibilityforaclaimperiod"
      target="_blank"
      rel="noopener noreferrer"
    >
      help page
    </a>{' '}
    for more details.
  </div>
);

export const JobMakerActionCancelClaimModalBody = () => (
  <div>
    <p>
      I am removing this employee’s declaration because they didn’t work a
      minimum average of 20 hours per week for the claim period.
    </p>
    You will not be able to claim JobMaker for this employee for this claim
    period.
  </div>
);

export const JobMakerActionNominationModalBody = ({
  onModalCheckboxChanged,
  currentDropDownAction,
}) => (
  <div>
    <p>I nominate this employee for the JobMaker Hiring Credit.</p>
    <Checkbox
      name="renominationCheckbox"
      label="Check this box if the employee was previously nominated for JobMaker but left the business.Now they have returned, you wish to renominate them."
      onChange={() => onModalCheckboxChanged(currentDropDownAction)}
      checked={currentDropDownAction === JobMakerActionTypes.ReNominate}
    />
  </div>
);

export const JobMakerActionCancelNominationModalBody = ({
  onModalCheckboxChanged,
  currentDropDownAction,
}) => (
  <div>
    <p>
      Removing this nomination will remove the employee from JobMaker claims
      with the ATO.
    </p>
    <Checkbox
      name="renominationCheckbox"
      label="Check this box if the employee was re-nominated for JobMaker and you want to remove them from claiming."
      onChange={() => onModalCheckboxChanged(currentDropDownAction)}
      checked={currentDropDownAction === JobMakerActionTypes.CancelReNominate}
    />
  </div>
);

export const generateModalConfig = (dropDownAction, onModalCheckboxChanged) => {
  let actionButtonLabel;
  let title;
  let body;
  let testid;
  switch (dropDownAction) {
    case JobMakerActionTypes.Nominate:
    case JobMakerActionTypes.ReNominate:
      actionButtonLabel = 'Nominate';
      title = 'Nominate employee';
      body = (
        <JobMakerActionNominationModalBody
          onModalCheckboxChanged={onModalCheckboxChanged}
          currentDropDownAction={dropDownAction}
        />
      );
      testid = `jobmakerAction-modal-${dropDownAction}`;
      break;
    case JobMakerActionTypes.CancelNominate:
    case JobMakerActionTypes.CancelReNominate:
      actionButtonLabel = 'Remove';
      title = 'Remove nomination';
      body = (
        <JobMakerActionCancelNominationModalBody
          onModalCheckboxChanged={onModalCheckboxChanged}
          currentDropDownAction={dropDownAction}
        />
      );
      testid = `jobmakerAction-modal-${dropDownAction}`;
      break;
    case JobMakerActionTypes.Claim:
      actionButtonLabel = 'Declare';
      title = 'Declare employee as eligible';
      body = <JobMakerActionClaimModalBody />;
      testid = `jobmakerAction-modal-${dropDownAction}`;
      break;
    case JobMakerActionTypes.CancelClaim:
      actionButtonLabel = 'Remove';
      title = 'Remove employee declaration';
      body = <JobMakerActionCancelClaimModalBody />;
      testid = `jobmakerAction-modal-${dropDownAction}`;
      break;
    default:
      return null;
  }

  return {
    body,
    title,
    actionButtonLabel,
    testid,
  };
};

const JobMakerActionModal = ({
  onCloseModal,
  onConfirmAction,
  dropDownAction,
  onModalCheckboxChanged,
}) => {
  const modalConfig = generateModalConfig(
    dropDownAction,
    onModalCheckboxChanged
  );

  if (!modalConfig) return null;
  const { body, title, actionButtonLabel, testid } = modalConfig;

  return (
    <Modal testid={testid} title={title} onCancel={onCloseModal}>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          testid="jobmaker-action-modal-cancel-btn"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          testid="jobmaker-action-modal-action-btn"
          onClick={onConfirmAction}
        >
          {actionButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobMakerActionModal;
