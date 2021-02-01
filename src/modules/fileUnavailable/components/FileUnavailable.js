import { BaseTemplate, Card, Icons, PageState } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import LinkButton from '../../../components/Button/LinkButton';
import fileUnavailableGraphic from './fileUnavailableGraphic.svg';

const FileUnavailable = ({ isOnlineOnly, reason }) => {
  const fileUnavailableCard = ({ title, description, action }) => (
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
            action,
          ]}
          title={title}
          description={description}
          image={<img src={fileUnavailableGraphic} alt="file unavailable" />}
        />
      </Card>
    </BaseTemplate>
  );

  const arlVersionTooLowCard = fileUnavailableCard({
    title: 'Business needs to be upgraded',
    description:
      'A new version is available. Upgrade your business in  AccountRight desktop to continue using the browser.',
    action: (
      <LinkButton
        href="https://help.myob.com/wiki/x/M4FW"
        icon={<Icons.OpenExternalLink />}
      >
        {' '}
        Show me how
      </LinkButton>
    ),
  });

  const arlVersionTooHighCard = fileUnavailableCard({
    title: "We're getting ready for you",
    description:
      "We're currently updating our system to support the latest version of AccountRight on the web browser. Please try accessing again later.",
  });

  const onlineUserCard = fileUnavailableCard({
    title: 'Business upgrading',
    description: (
      <p>
        Your business is being updated and could take up to 2 hours to complete.
        <br />
        We apologise for any inconvenience.
        <br />
        Check back later to see if your business has updated.
      </p>
    ),
  });

  const arlUserCard =
    reason === 'versionTooLow' ? arlVersionTooLowCard : arlVersionTooHighCard;

  return isOnlineOnly ? onlineUserCard : arlUserCard;
};

const mapStateToProps = (state) => ({
  ...state,
  isOnlineUser: state.isOnlineUser,
  reason: state.reason,
});

export default connect(mapStateToProps)(FileUnavailable);
