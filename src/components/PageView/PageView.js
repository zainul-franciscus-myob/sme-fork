import React from 'react';

import LoadingFailPageState from './LoadingFailPageState';
import LoadingPageState from '../LoadingPageState/LoadingPageState';
import LoadingState from './LoadingState';

const PageView = ({
  isLoading,
  loadingState,
  view,
}) => {
  if (isLoading) {
    return <LoadingPageState />;
  }

  switch (loadingState) {
    case LoadingState.LOADING:
      return <LoadingPageState />;
    case LoadingState.LOADING_FAIL:
      return <LoadingFailPageState />;
    default:
      return view;
  }
};

export default PageView;
