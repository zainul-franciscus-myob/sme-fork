import { connect } from 'react-redux';
import React from 'react';

import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';

const RootView = ({
  drawer, nav, onboarding, children, isLoading, shouldShowOnboarding,
}) => {
  if (isLoading) return <LoadingPageState />;
  if (shouldShowOnboarding) return onboarding;

  return (
    <>
      { drawer }
      { nav }

      <div id="main">
        { children }
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  shouldShowOnboarding: state.shouldShowOnboarding,
});

export default connect(mapStateToProps)(RootView);
