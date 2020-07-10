import { BaseTemplate, Card, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import LinkButton from '../../../components/Button/LinkButton';
import fileUnavailableGraphic from './fileUnavailableGraphic.svg';

const FileUnavailable = ({ isOnlineOnly }) => {
  const arlUserCard = (
    <BaseTemplate>
      <Card>
        <PageState
          actions={[
            <LinkButton
              href="/#/businesses"
              type="link"
              icon={<Icons.Switch />}
            >
              My businesses
            </LinkButton>,
            <LinkButton
              href="https://help.myob.com/wiki/x/M4FW"
              icon={<Icons.OpenExternalLink />}
            >
              {' '}
              Show me how
            </LinkButton>,
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
            <LinkButton
              href="/#/businesses"
              type="link"
              icon={<Icons.Switch />}
            >
              My businesses
            </LinkButton>,
          ]}
          title="Business upgrading"
          description={
            <React.Fragment>
              <p>
                Your business is being updated and could take up to 2 hours to
                complete.
              </p>
              <p>We apologise for any inconvenience.</p>
              <p>Check back later to see if your business has updated.</p>
            </React.Fragment>
          }
          image={<img src={fileUnavailableGraphic} alt="file unavailable" />}
        />
      </Card>
    </BaseTemplate>
  );
  return isOnlineOnly ? onlineUserCard : arlUserCard;
};

const mapStateToProps = (state) => ({
  ...state,
  isOnlineUser: state.isOnlineUser,
});

export default connect(mapStateToProps)(FileUnavailable);
