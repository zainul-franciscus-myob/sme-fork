import { Button, Card, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getDocumentUploadDate, getDocumentUrl, getThumbnailUri } from '../LinkBillSelectors';
import styles from './LinkBillDocumentView.module.css';

const openNewTab = url => window.open(url);

const LinkBillDocumentView = ({
  thumbnailUri,
  documentUrl,
  dateUploaded,
}) => {
  const documentBody = (
    <Card.Body
      child={(
        <div className={styles.documentView}>
          <div className={styles.thumbnail}>
            <img src={thumbnailUri} alt="Document thumbnail" />
          </div>
          <div className={styles.pdf}>
            <div><strong>{`Document uploaded ${dateUploaded}`}</strong></div>
            <div>
              <Button type="link" icon={<Icons.Show />} iconLeft onClick={() => openNewTab(documentUrl)}>
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
  thumbnailUri: getThumbnailUri(state),
  documentUrl: getDocumentUrl(state),
  dateUploaded: getDocumentUploadDate(state),
});

export default connect(mapStateToProps)(LinkBillDocumentView);
