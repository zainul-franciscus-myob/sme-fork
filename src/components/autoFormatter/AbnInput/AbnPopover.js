import { Icons, Popover } from '@myob/myob-widgets';
import React from 'react';
import classNames from 'classnames';

import AbnStatus from './AbnStatus';
import LinkButton from '../../Button/LinkButton';
import ServiceUnavailableImage from '../../ServiceUnavailableImage/ServiceUnavailableImage';
import styles from './AbnPopover.module.css';

const getDisplayTextByStatus = (status) =>
  ({
    [AbnStatus.ACTIVE]: 'ABN active',
    [AbnStatus.CANCELLED]: 'ABN cancelled',
    [AbnStatus.INVALID]: 'ABN invalid',
    [AbnStatus.NONE]: 'No ABN provided',
  }[status]);

const AbnPopover = ({
  abn,
  status,
  effectiveFrom,
  gstEffectiveFrom,
  gstRegistered,
  entityType,
  entityName,
  tradingName,
  postcode,
  abnLink,
  editContactUrl,
}) => {
  if (status === AbnStatus.UNAVAILABLE) {
    return (
      <div className={classNames(styles.validationResult, styles.unavailable)}>
        <ServiceUnavailableImage tooltipMessage="The ABN Lookup service is currently unavailable." />
      </div>
    );
  }

  const abnNumber = (
    <div>
      <span className={styles.label}>ABN</span>
      <span>{abn}</span>
    </div>
  );

  const statusInfo = (
    <div>
      <span className={styles.label}>Status</span>
      <span
        className={classNames(
          status === AbnStatus.ACTIVE && styles.active,
          status === AbnStatus.CANCELLED && styles.cancelled,
          status === AbnStatus.INVALID && styles.invalid
        )}
      >
        {status}
      </span>
      {effectiveFrom && <span>{` (${effectiveFrom})`}</span>}
    </div>
  );

  const abnLinkInfo = (
    <div>
      <LinkButton
        icon={<Icons.OpenExternalLink />}
        iconRight
        isOpenInNewTab
        href={abnLink}
      >
        Open ABN lookup website
      </LinkButton>
    </div>
  );

  const editContactLink = (
    <LinkButton href={editContactUrl} iconRight>
      Edit contact
    </LinkButton>
  );

  const activeAndCancelledAbnInfo = (
    <>
      {abnNumber}
      {statusInfo}
      <div>
        <span className={styles.label}>Registered for GST</span>
        <span>
          {gstRegistered ? `Yes (${gstEffectiveFrom})` : 'Not registered'}
        </span>
      </div>
      <div className={styles.separator}></div>
      <div>
        <span className={styles.label}>Entity type</span>
        <span>{entityType || '-'}</span>
      </div>
      <div>
        <span className={styles.label}>Entity name</span>
        <span>{entityName || '-'}</span>
      </div>
      <div>
        <span className={styles.label}>Trading name</span>
        <span>{tradingName || '-'}</span>
      </div>
      <div>
        <span className={styles.label}>Postcode</span>
        <span>{postcode || '-'}</span>
      </div>
      {abnLink && (
        <>
          <br />
          {abnLinkInfo}
        </>
      )}
    </>
  );

  const invalidAbnInfo = (
    <>
      {abnNumber}
      {statusInfo}
      <br />
      <div>
        {"The ABN entered isn't valid. Contact the"}
        <br />
        company or individual to confirm their
        <br />
        details.
      </div>
      <br />
      {editContactUrl && editContactLink}
      {abnLink && abnLinkInfo}
    </>
  );

  const noAbnAvailableInfo = (
    <>
      <div>
        {"You haven't entered an ABN"}
        <br />
        for this contact.
      </div>
      <br />
      {editContactUrl && editContactLink}
    </>
  );

  const popoverBody = {
    [AbnStatus.ACTIVE]: activeAndCancelledAbnInfo,
    [AbnStatus.CANCELLED]: activeAndCancelledAbnInfo,
    [AbnStatus.INVALID]: invalidAbnInfo,
    [AbnStatus.NONE]: noAbnAvailableInfo,
  }[status];

  const statusIcon = {
    [AbnStatus.ACTIVE]: {
      icon: <Icons.Success />,
      className: styles.iconActive,
    },
    [AbnStatus.CANCELLED]: {
      icon: <Icons.Warning />,
      className: styles.iconCancelled,
    },
    [AbnStatus.INVALID]: {
      icon: <Icons.Error />,
      className: styles.iconInvalid,
    },
    [AbnStatus.NONE]: {
      icon: undefined,
      className: '',
    },
  }[status];

  const noIconClassname = !statusIcon.icon ? styles.noIcon : '';

  return (
    <Popover
      closeOnOuterAction
      body={<Popover.Body child={popoverBody} />}
      place="below"
    >
      <div className={classNames(styles.validationResult, noIconClassname)}>
        {statusIcon.icon && (
          <span className={classNames(styles.icon, statusIcon.className)}>
            {statusIcon.icon}
          </span>
        )}
        <span className={styles.statusText}>{`${getDisplayTextByStatus(
          status
        )}`}</span>
      </div>
    </Popover>
  );
};
export default AbnPopover;
