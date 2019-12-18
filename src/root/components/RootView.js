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
}) => {
  if (isLoading) return <LoadingPageState />;
  if (shouldShowOnboarding) return onboarding;

  return (
    <div id="main" className={style.main}>
      { drawer }
      <div className={style.navAndRootView}>
        { nav }
        { children }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  shouldShowOnboarding: state.shouldShowOnboarding,
});

export default connect(mapStateToProps)(RootView);
