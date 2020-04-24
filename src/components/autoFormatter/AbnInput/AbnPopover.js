import { Icons, Popover } from '@myob/myob-widgets';
import React, { useState } from 'react';
import classNames from 'classnames';

import AbnStatus from './AbnStatus';
import styles from './AbnPopover.module.css';

const getDisplayTextByStatus = status => status.toLowerCase();

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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const abnInfo = (
    <>
      <div>
        <span className={styles.label}>ABN</span>
        <span>{abn}</span>
      </div>
      <div>
        <span className={styles.label}>Status</span>
        <span
          className={classNames(
            status === AbnStatus.ACTIVE && styles.active,
            status === AbnStatus.CANCELLED && styles.cancelled,
          )}
        >
            {status}
          </span>
        <span>{` (${effectiveFrom})`}</span>
      </div>
      <div>
        <span className={styles.label}>Registered for GST</span>
        <span>{gstRegistered ? `Yes (${gstEffectiveFrom})` : 'Not registered'}</span>
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
    </>
  );

  const popoverBody = [AbnStatus.ACTIVE, AbnStatus.CANCELLED].includes(status)
    ? abnInfo : 'The ABN entered isn\'t valid. Contact the company or individual to confirm their details.';

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
  }[status];

  return (
    <Popover isOpen={isOpen} body={<Popover.Body child={popoverBody} />} place="above">
      <div
        className={styles.validationResult}
        onFocus={() => setIsOpen(true)}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span className={classNames(styles.icon, statusIcon.className)}>
          {statusIcon.icon}
        </span>
        <span>{`ABN ${getDisplayTextByStatus(status)}`}</span>
      </div>
    </Popover>
  );
};
export default AbnPopover;
