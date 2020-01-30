import {
  Alert, BaseTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsTimesheetSetUp, getLoadingState, getModal,
} from '../timesheetSelectors';
import DeleteTimesheetModal from './DeleteModal';
import ModalType from '../ModalType';
import PageView from '../../../components/PageView/PageView';
import TimesheetIsSetUpView from './TimesheetIsSetUpView';
import TimesheetNotSetUpView from './TimesheetNotSetUpView';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const TimesheetView = ({
  alert,
  isTimesheetSetUp,
  onEmptyStateLinkClick,
  onEmployeeChange,
  loadingState,
  onSelectedDateChange,
  onSaveClick,
  onDeleteClick,
  onRowChange,
  onRemoveRow,
  onAddRow,
  onHoursBlur,
  onDisplayStartStopTimesChange,
  onModalCancel,
  onModalDelete,
  modal,
  unsavedModalListeners,
}) => {
  const view = (
    <BaseTemplate>
      <PageHead title="Enter timesheet" />
      {
        alert && (
          <Alert type={alert.type}>
            {alert.message}
          </Alert>
        )
      }
      {
        modal === ModalType.DELETE
        && (
        <DeleteTimesheetModal
          onCancel={onModalCancel}
          onDelete={onModalDelete}
        />
        )
      }
      {
        modal === ModalType.UNSAVED
        && (
          <UnsavedModal
            title="Save changes before you go?"
            description="Looks like you&apos;ve made changes to this timesheet. Do you want to save these changes now?"
            onConfirmSave={unsavedModalListeners.onSave}
            onConfirmUnsave={unsavedModalListeners.onUnsave}
            onCancel={unsavedModalListeners.onCancel}
          />
        )
      }
      {isTimesheetSetUp
        ? (
          <TimesheetIsSetUpView
            onEmployeeChange={onEmployeeChange}
            onSelectedDateChange={onSelectedDateChange}
            onRowChange={onRowChange}
            onRemoveRow={onRemoveRow}
            onAddRow={onAddRow}
            onSaveClick={onSaveClick}
            onHoursBlur={onHoursBlur}
            onDeleteClick={onDeleteClick}
            onDisplayStartStopTimesChange={onDisplayStartStopTimesChange}
          />
        )
        : <TimesheetNotSetUpView onLinkClick={onEmptyStateLinkClick} />}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapPropsToState = state => ({
  isTimesheetSetUp: getIsTimesheetSetUp(state),
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  modal: getModal(state),
});

export default connect(mapPropsToState)(TimesheetView);
