import { Aside, Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInTrayDocumentFileUrl, getInTrayDocumentUploadedDate } from '../selectors/billSelectors';
import styles from './BillDocumentViewer.module.css';

const BillDocumentViewer = ({
  toggleSplitView,
  documentUploadedDate,
}) => (
  <Aside>
    <Aside.Header>
      <Aside.Title>
        Source document uploaded
        {documentUploadedDate}
      </Aside.Title>
      <div className={styles.actionButtonWrapper}>
        <Button onClick={toggleSplitView} type="link" icon={<Icons.Collapse />}>
          Close split view
        </Button>
      </div>
    </Aside.Header>
  </Aside>
);

const mapStateToProps = state => ({
  documentFileUrl: getInTrayDocumentFileUrl(state),
  documentUploadedDate: getInTrayDocumentUploadedDate(state),
});

export default connect(mapStateToProps)(BillDocumentViewer);
