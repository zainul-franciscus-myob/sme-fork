import {
  BaseTemplate, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTimesheetSetUp } from '../timesheetSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import PageView from '../../../components/PageView/PageView';
import TimesheetIsSetUpView from './TimesheetIsSetUpView';
import TimesheetNotSetUpView from './TimesheetNotSetUpView';

const TimesheetView = ({
  isTimesheetSetUp,
  onEmptyStateLinkClick,
  onEmployeeChange,
}) => {
  const view = (
    <BaseTemplate>
      <PageHead title="Enter timesheet" />
      {isTimesheetSetUp
        ? (
          <TimesheetIsSetUpView
            onEmployeeChange={onEmployeeChange}
          />
        )
        : <TimesheetNotSetUpView onLinkClick={onEmptyStateLinkClick} />}
    </BaseTemplate>
  );

  return <PageView loadingState={LoadingState.LOADING_SUCCESS} view={view} />;
};

const mapPropsToState = state => ({
  isTimesheetSetUp: getIsTimesheetSetUp(state),
});

export default connect(mapPropsToState)(TimesheetView);
