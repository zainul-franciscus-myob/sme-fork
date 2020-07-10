import { PageState, StandardTemplate } from '@myob/myob-widgets';
import React from 'react';

import Icon from '../Icon/Icon';

const WrongPageState = () => (
  <StandardTemplate>
    <PageState
      title="Sorry, it looks like you've landed in the wrong place"
      description={
        <div>{"We can't load the page because it doesn't seem to exist."}</div>
      }
      image={<Icon.WrongPage />}
    />
  </StandardTemplate>
);

export default WrongPageState;
