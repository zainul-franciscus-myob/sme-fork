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
}) => {
  if (isLoading) return <LoadingPageState />;
  if (shouldShowOnboarding) return onboarding.render();

  return (
    <div id="main" className={style.main}>
      { drawer.render(tasks) }
      <div className={style.navAndRootView}>
        { nav.render(tasks) }
        { children }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  tasks: state.tasks,
  shouldShowOnboarding: state.shouldShowOnboarding,
});

export default connect(mapStateToProps)(RootView);
