import { PageState } from '@myob/myob-widgets';
import React from 'react';

import noResultFoundImage from './no-results-found.svg';

const NoResultPageState = ({
  title,
  description,
  ...otherProps
}) => (
  <PageState
    title={title}
    description={description}
    image={<img src={noResultFoundImage} alt="No result found" />}
    {...otherProps}
  />
);

export default NoResultPageState;
