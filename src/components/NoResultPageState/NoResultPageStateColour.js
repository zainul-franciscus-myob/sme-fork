import { PageState } from '@myob/myob-widgets';
import React from 'react';

import noResultStateImage from './no-results-found-colour.svg';
import style from './NoResultPageStateColour.css';

const NoResultPageState = ({
  title,
  description,
  actions,
  showNoResultImage = true,
}) => {
  const pageStateProps = {
    title,
    description,
    actions,
    image: showNoResultImage ? (
      <img
        className={style.jobsNoResultImg}
        src={noResultStateImage}
        alt="No results found"
      />
    ) : undefined,
  };

  return <PageState {...pageStateProps} />;
};

export default NoResultPageState;
