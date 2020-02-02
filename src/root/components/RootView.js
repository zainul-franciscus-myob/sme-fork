import { connect } from 'react-redux';
import React from 'react';

import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import style from './RootView.module.css';

const RootView = ({
  nav,
  onboarding,
  children,
  isLoading,
  shouldShowOnboarding,
  drawer,
  tasks,
  businessName,
}) => {
  if (isLoading) return <LoadingPageState />;
  if (shouldShowOnboarding) return onboarding.render();

  return (
    <div id="main" className={style.main}>
      { drawer.render(tasks) }
      <div className={style.navAndRootView}>
        { nav.render(tasks, businessName) }
        { children }
      </div>
    </div>
  );
};

const mapStateToProps = ({
  isLoading, tasks, businessDetails: { organisationName }, shouldShowOnboarding,
}) => ({
  isLoading,
  tasks,
  businessName: organisationName,
  shouldShowOnboarding,
});

export default connect(mapStateToProps)(RootView);
