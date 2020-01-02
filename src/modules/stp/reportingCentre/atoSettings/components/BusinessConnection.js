import {
  Button, Card, FormHorizontal, Input, Tooltip,
} from '@myob/myob-widgets';
import React from 'react';

import AbnInput from '../../../../../components/autoFormatter/AbnInput/AbnInput';
import styles from './BusinessConnection.module.css';

const BusinessConnection = ({
  onEditBusinessConnectionClick,
  abn,
  softwareId,
}) => {
  const softwareIdTooltip = (
    <Tooltip>Software ID is how the ATO connects your business to STP</Tooltip>
  );

  const cardBody = (
    <>
      <h3>Business ABN connected to the ATO</h3>
      <p>
        Below is the ABN connected to the ATO. If you&apos;ve had issues sending data to the ATO,
        the ABN might be wrong.
        <div className={styles.linkButton}>
          <Button type="link" onClick={onEditBusinessConnectionClick}>
            Edit STP business details
          </Button>
        </div>
      </p>
      <FormHorizontal layout="primary">
        <AbnInput
          name="abn"
          label="ABN"
          value={abn}
          width="sm"
          disabled
        />
        <Input
          name="softwareId"
          label="Software ID"
          labelAccessory={softwareIdTooltip}
          value={softwareId}
          width="sm"
          disabled
        />
      </FormHorizontal>
    </>
  );

  return <Card body={<Card.Body child={cardBody} />} />;
};

export default BusinessConnection;
