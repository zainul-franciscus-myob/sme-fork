import {
  Button, Card, Icons,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './BillInTrayDocumentView.module.css';

const openNewTab = url => () => window.open(url);

const BillInTrayDocumentView = ({
  inTrayDocument,
}) => {
  const documentBody = (
    <Card.Body
      child={(
        <div className={styles.documentView}>
          <div className={styles.thumbnail}>
            <img src={inTrayDocument.thumbnailUrl} alt="Document thumbnail" />
          </div>
          <div className={styles.pdf}>
            <div><strong>{`Document uploaded ${inTrayDocument.uploadedDate}`}</strong></div>
            <div>
              <Button
                type="link"
                icon={<Icons.Show />}
                iconLeft
                onClick={openNewTab(inTrayDocument.fileUrl)}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  );

  return (
    <Card
      body={documentBody}
    />
  );
};

export default BillInTrayDocumentView;
