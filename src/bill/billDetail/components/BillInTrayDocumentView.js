import { Card, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInTrayDocumentFileUrl, getInTrayDocumentUploadedDate, getIntrayDocumentThumbnailUrl } from '../selectors/billSelectors';
import LinkButton from '../../../components/Button/LinkButton';
import styles from './BillInTrayDocumentView.module.css';

const BillInTrayDocumentView = ({
  inTrayDocumentThumbnailUrl,
  inTrayDocumentUploadedDate,
  inTrayDocumentFileUrl,

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
              <LinkButton
                icon={<Icons.Show />}
                href={inTrayDocumentFileUrl}
                isOpenInNewTab
              >
                View
              </LinkButton>
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
  inTrayDocumentFileUrl: getInTrayDocumentFileUrl(state),
  inTrayDocumentThumbnailUrl: getIntrayDocumentThumbnailUrl(state),
  inTrayDocumentUploadedDate: getInTrayDocumentUploadedDate(state),
});

export default connect(mapStateToProps)(BillInTrayDocumentView);
