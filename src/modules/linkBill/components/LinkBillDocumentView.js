import { Card, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDocumentUploadDate,
  getDocumentUrl,
  getThumbnailUri,
} from '../LinkBillSelectors';
import LinkButton from '../../../components/Button/LinkButton';
import styles from './LinkBillDocumentView.module.css';

const LinkBillDocumentView = ({ thumbnailUri, documentUrl, dateUploaded }) => {
  const documentBody = (
    <Card.Body
      child={
        <div className={styles.documentView}>
          <div className={styles.thumbnail}>
            <img src={thumbnailUri} alt="Document thumbnail" />
          </div>
          <div className={styles.pdf}>
            <div>
              <strong>{`Document uploaded ${dateUploaded}`}</strong>
            </div>
            <div>
              <LinkButton
                icon={<Icons.Show />}
                href={documentUrl}
                isOpenInNewTab
              >
                View
              </LinkButton>
            </div>
          </div>
        </div>
      }
    />
  );

  return <Card body={documentBody} />;
};

const mapStateToProps = (state) => ({
  thumbnailUri: getThumbnailUri(state),
  documentUrl: getDocumentUrl(state),
  dateUploaded: getDocumentUploadDate(state),
});

export default connect(mapStateToProps)(LinkBillDocumentView);
