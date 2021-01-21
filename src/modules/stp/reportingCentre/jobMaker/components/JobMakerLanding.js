import { Card, Icons, PageState } from '@myob/myob-widgets';
import React from 'react';

import LinkButton from '../../../../../components/Button/LinkButton';
import landingImage from './jobmaker_landing.svg';

const JobMakerLanding = () => {
  const actions = [
    <LinkButton
      key={1}
      href="https://help.myob.com/wiki/x/mAaFAw"
      icon={<Icons.OpenExternalLink />}
      isOpenInNewTab
    >
      Step-by-step guide to JobMaker
    </LinkButton>,
  ];

  return (
    <Card testid="jobMaker-landing">
      <PageState
        title="Soon you’ll have access to the JobMaker hiring credit for your business"
        description="In the meantime, find out if your business is eligible and register with the ATO."
        image={
          <img
            src={landingImage}
            alt="Illustration of a group of employee name cards"
          />
        }
        actions={actions}
      />
    </Card>
  );
};

export default JobMakerLanding;
