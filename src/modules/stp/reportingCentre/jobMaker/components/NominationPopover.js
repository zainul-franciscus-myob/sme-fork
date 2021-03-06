import { OpenExternalLinkIcon, Popover } from '@myob/myob-widgets';
import React from 'react';

import styles from './NominationPopover.module.css';

const NominationPopover = ({ nomination, testid }) => {
  const popOverContent = (
    <div testid="Popover">
      <p>
        Check employee nomination status by logging into either service below.
        Updates may take up to 72 hours to show with the ATO.
      </p>{' '}
      <a
        href="https://my.gov.au/LoginServices/main/login?execution=e5s1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OpenExternalLinkIcon /> ATO online services
      </a>
      <br></br>
      <a
        href="https://bp.ato.gov.au/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OpenExternalLinkIcon /> The Business portal
      </a>
    </div>
  );

  return nomination ? (
    <Popover
      body={<Popover.Body child={popOverContent} />}
      preferPlace={'below'}
      isOpen={false}
      closeOnOuterAction
      classes={[styles.atoPopOver]}
    >
      <a className={styles.aBtn} href testid={testid}>
        {nomination}
      </a>
    </Popover>
  ) : null;
};

export default NominationPopover;
