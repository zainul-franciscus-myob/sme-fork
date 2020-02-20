import { connect } from 'react-redux';
import BaseTemplate from '@myob/myob-widgets/lib/components/BaseTemplate/BaseTemplate';
import Card from '@myob/myob-widgets/lib/components/Card/Card';
import Icons from '@myob/myob-widgets/lib/components/Icons';
import PageState from '@myob/myob-widgets/lib/components/PageState/PageState';
import React from 'react';

import LinkButton from '../../../components/Button/LinkButton';
import fileUnavailableGraphic from './fileUnavailableGraphic.svg';

const FileUnavailable = ({ region, businessId, isOnlineOnly }) => {
  const arlUserCard = (
    <BaseTemplate>
      <Card>
        <PageState
          actions={[
            <LinkButton href="/#/businesses" type="link" icon={<Icons.Switch />}>My businesses</LinkButton>,
            <LinkButton href="https://help.myob.com/wiki/x/M4FW" icon={<Icons.OpenExternalLink />}> Show me how</LinkButton>,
          ]}
          title="Business needs to be upgraded"
          description="A new version is available. Upgrade your business in  AccountRight desktop to continue using the browser. "
          image={<img src={fileUnavailableGraphic} alt="file unavailable" />}
        />
      </Card>
    </BaseTemplate>
  );

  const onlineUserCard = (
    <BaseTemplate>
      <Card>
        <PageState
          actions={[
            <LinkButton href="/#/businesses" type="link" icon={<Icons.Switch />}>My businesses</LinkButton>,
            <LinkButton href={`/#/${region}/${businessId}/dashboard`} type="link" icon={<Icons.Refresh />}>Refresh</LinkButton>,
          ]}
          title="Business upgrading"
          description="Your business is being upgraded and will be available soon. Refresh this page to check if your business is upgraded."
          image={<img src={fileUnavailableGraphic} alt="file unavailable" />}
        />
      </Card>
    </BaseTemplate>
  );
  return isOnlineOnly ? onlineUserCard : arlUserCard;
};

const mapStateToProps = state => ({
  ...state,
  isOnlineUser: state.isOnlineUser,
});

export default connect(mapStateToProps)(FileUnavailable);
