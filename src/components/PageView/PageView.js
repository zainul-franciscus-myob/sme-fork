import React from 'react';

import LoadingPageState from '../LoadingPageState/LoadingPageState';

const spinnerView = <LoadingPageState />;

const PageView = ({
  isLoading,
  isSubmitting,
  view,
}) => {
  let pageView;
  if (isLoading || isSubmitting) {
    pageView = spinnerView;
  } else {
    pageView = view;
  }

  return (
    <>
      {pageView}
    </>
  );
};

export default PageView;
