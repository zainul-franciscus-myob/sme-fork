import { PageState } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../Icon/Icon';

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
    image: showNoResultImage ? <Icon.NoResultFolder /> : undefined,
  };

  return <PageState {...pageStateProps} />;
};

export default NoResultPageState;
