import {
  BaseTemplate,
  Button,
  Card,
  Icons,
  PageState,
  RefreshIcon,
  Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsOnlineOnly,
  getIsPolling,
  getReason,
  getUpdateFileSuccess,
} from '../FileUnavailableSelectors';
import LinkButton from '../../../components/Button/LinkButton';
import fileUnavailableGraphic from './fileUnavailableGraphic.svg';
import fileUpdatingGraphic from './fileTransfer.svg';
import somethingWentWrongGraphic from './somethingWentWrong.svg';
import styles from './fileUnavailable.module.css';
import successGraphic from './success.svg';

const FileUnavailableView = ({
  onTryAgainClick,
  isOnlineOnly,
  reason,
  hasUpdatedSuccessfully,
  isPolling,
}) => {
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

  const onlineFileUpdatePolling = (
    <BaseTemplate>
      <Card>
        <PageState
          title={"We're currently performing some quick updates"}
          description={
            <>
              {"This won't take very long."}
              <Spinner className={styles.spinnerSpacing} size="small" />
            </>
          }
          image={<img src={fileUpdatingGraphic} alt="file updating" />}
        />
      </Card>
    </BaseTemplate>
  );

  const onlineFileUpdateSuccess = (
    <BaseTemplate>
      <Card>
        <PageState
          title={'Update complete'}
          description={<>{'Redirecting you to your file now.'}</>}
          image={<img src={successGraphic} alt="success" />}
        />
      </Card>
    </BaseTemplate>
  );

  const onlineFileUpdateFailed = (
    <BaseTemplate>
      <Card>
        <PageState
          title={'Looks like something went wrong on our end'}
          description={
            <>
              {
                "Don't worry, your data is safe and isn't affected by this update."
              }
            </>
          }
          image={<img src={somethingWentWrongGraphic} alt="failed" />}
          actions={[
            <Button
              key={1}
              type="link"
              icon={<RefreshIcon />}
              onClick={onTryAgainClick}
            >
              Try again
            </Button>,
          ]}
        />
      </Card>
    </BaseTemplate>
  );

  const arlVersionTooHighCard = fileUnavailableCard({
    title: "We're getting ready for you",
    description:
      "We're currently updating our system to support the latest version of AccountRight on the web browser. Please try accessing again later.",
  });

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

  let onlineUserCard;
  if (isPolling && !hasUpdatedSuccessfully)
    onlineUserCard = onlineFileUpdatePolling;
  else if (!isPolling && hasUpdatedSuccessfully)
    onlineUserCard = onlineFileUpdateSuccess;
  else onlineUserCard = onlineFileUpdateFailed;

  const arlUserCard =
    reason === 'versionTooLow' ? arlVersionTooLowCard : arlVersionTooHighCard;

  return isOnlineOnly ? onlineUserCard : arlUserCard;
};

const mapStateToProps = (state) => ({
  isOnlineOnly: getIsOnlineOnly(state),
  reason: getReason(state),
  hasUpdatedSuccessfully: getUpdateFileSuccess(state),
  isPolling: getIsPolling(state),
});

export default connect(mapStateToProps)(FileUnavailableView);
