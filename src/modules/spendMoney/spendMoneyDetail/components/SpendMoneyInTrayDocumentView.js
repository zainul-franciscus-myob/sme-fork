import { Button, Card, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInTrayDocumentUploadedDate, getIntrayDocumentThumbnailUrl } from '../spendMoneyDetailSelectors';
import styles from './SpendMoneyInTrayDocumentView.module.css';

const SpendMoneyInTrayDocumentView = ({
  inTrayDocumentThumbnailUrl,
  inTrayDocumentUploadedDate,
  onOpenSplitView,
}) => {
  const documentBody = (
    <Card.Body
      child={(
        <div className={styles.documentView}>
          <div className={styles.thumbnail}>
            <img src={inTrayDocumentThumbnailUrl} alt="Document thumbnail" />
          </div>
          <div className={styles.pdf}>
            <div><strong>{`Document uploaded ${inTrayDocumentUploadedDate}`}</strong></div>
            <div>
              <Button onClick={onOpenSplitView} type="link" icon={<Icons.Expand />}>
                Open split view
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  );

  return (
    <Card
      classes={[styles.card]}
      body={documentBody}
    />
  );
};

const mapStateToProps = state => ({
  inTrayDocumentThumbnailUrl: getIntrayDocumentThumbnailUrl(state),
  inTrayDocumentUploadedDate: getInTrayDocumentUploadedDate(state),
});

export default connect(mapStateToProps)(SpendMoneyInTrayDocumentView);
