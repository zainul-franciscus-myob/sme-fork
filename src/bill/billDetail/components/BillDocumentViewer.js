import { Aside, Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasInTrayDocumentUrl,
  getInTrayDocument, getInTrayDocumentUrl,
} from '../selectors/BillInTrayDocumentSelectors';
import DocumentViewer from '../../../components/DocumentViewer/DocumentViewer';
import PageView from '../../../components/PageView/PageView';
import styles from './BillDocumentViewer.module.css';

const BillDocumentViewer = ({
  onCloseSplitViewButtonClick,
  inTrayDocument,
  hasInTrayDocumentUrl,
  inTrayDocumentUrl,
}) => (
  <Aside>
    <Aside.Header>
      <Aside.Title>
        Source document uploaded
        {inTrayDocument.uploadedDate}
      </Aside.Title>
      <div className={styles.actionButtonWrapper}>
        <Button onClick={onCloseSplitViewButtonClick} type="link" icon={<Icons.Collapse />}>
          Close split view
        </Button>
      </div>
    </Aside.Header>
    <PageView
      isLoading={!hasInTrayDocumentUrl}
      view={(
        <DocumentViewer
          src={inTrayDocumentUrl}
        />
      )}
    />
  </Aside>
);

const mapStateToProps = state => ({
  inTrayDocument: getInTrayDocument(state),
  hasInTrayDocumentUrl: getHasInTrayDocumentUrl(state),
  inTrayDocumentUrl: getInTrayDocumentUrl(state),
});

export default connect(mapStateToProps)(BillDocumentViewer);
