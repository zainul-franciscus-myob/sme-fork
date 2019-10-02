import {
  Button, Card, Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInTrayDocument } from '../billServiceSelectors';
import styles from './BillServiceInTrayDocumentView.module.css';

const openNewTab = url => () => window.open(url);

const BillServiceInTrayDocumentView = ({
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

const mapStateToProps = state => ({
  inTrayDocument: getInTrayDocument(state),
});

export default connect(mapStateToProps)(BillServiceInTrayDocumentView);
