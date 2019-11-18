import { PageState } from '@myob/myob-widgets';
import React from 'react';

import noResultFoundImage from './no-results-found.svg';

const NoResultPageState = ({
  title,
  description,
  actions,
  showNoResultImage = true,
}) => {
  const noResultImage = (
    <img src={noResultFoundImage} alt="No result found" />
  );

  const pageStateProps = {
    title,
    description,
    actions,
    image: showNoResultImage ? noResultImage : undefined,
  };

  return (
    <PageState {...pageStateProps} />
  );
};

export default NoResultPageState;
