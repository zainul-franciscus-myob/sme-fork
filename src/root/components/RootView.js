import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import style from './RootView.module.css';

const RootView = ({
  businessId,
  businessName,
  businessRole,
  children,
  drawer,
  isLoading,
  nav,
  onboarding,
  serialNumber,
  shouldShowOnboarding,
  tasks,
  browserAlert,
  onDismissBrowserAlert,
}) => {
  if (isLoading) return <LoadingPageState />;
  if (shouldShowOnboarding) return onboarding.render();

  return (
    <div id="main" className={style.main}>
      { drawer.render(tasks) }
      <div className={style.navAndRootView}>
        { nav.render(
          tasks,
          businessId,
          businessName,
          businessRole,
          serialNumber,
        ) }
        {browserAlert && (
          <div className={style.browserAlert}>
            <Alert type={browserAlert.type} onDismiss={onDismissBrowserAlert}>
              {browserAlert.message}
            </Alert>
          </div>
        )}
        { children }
      </div>
    </div>
  );
};

const mapStateToProps = ({
  businessDetails: { organisationName, serialNumber },
  businessId,
  businessRole,
  isLoading,
  shouldShowOnboarding,
  tasks,
  browserAlert,
}) => ({
  businessId,
  businessName: organisationName,
  businessRole,
  isLoading,
  serialNumber,
  shouldShowOnboarding,
  tasks,
  browserAlert,
});

export default connect(mapStateToProps)(RootView);
