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
  activities,
}) => {
  if (isLoading) return <LoadingPageState />;
  if (shouldShowOnboarding) return onboarding.render();

  return (
    <div id="main" className={style.main}>
      { drawer.render(activities) }
      <div className={style.navAndRootView}>
        { nav.render(activities) }
        { children }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  activities: state.activities,
  shouldShowOnboarding: state.shouldShowOnboarding,
});

export default connect(mapStateToProps)(RootView);
