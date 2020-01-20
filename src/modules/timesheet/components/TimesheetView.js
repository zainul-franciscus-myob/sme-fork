import {
  BaseTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTimesheetSetUp, getLoadingState } from '../timesheetSelectors';
import PageView from '../../../components/PageView/PageView';
import TimesheetIsSetUpView from './TimesheetIsSetUpView';
import TimesheetNotSetUpView from './TimesheetNotSetUpView';

const TimesheetView = ({
  isTimesheetSetUp,
  onEmptyStateLinkClick,
  onEmployeeChange,
  loadingState,
  onWeekStartDateChange,
  onRowChange,
  onRemoveRow,
  onAddRow,
  onDisplayStartStopTimesChange,
}) => {
  const view = (
    <BaseTemplate>
      <PageHead title="Enter timesheet" />
      {isTimesheetSetUp
        ? (
          <TimesheetIsSetUpView
            onEmployeeChange={onEmployeeChange}
            onWeekStartDateChange={onWeekStartDateChange}
            onRowChange={onRowChange}
            onRemoveRow={onRemoveRow}
            onAddRow={onAddRow}
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
});

export default connect(mapPropsToState)(TimesheetView);
