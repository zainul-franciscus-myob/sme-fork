import { Aside, Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getHasInTrayDocumentUrl,
  getInTrayDocument,
  getInTrayDocumentUrl,
} from '../selectors/BillInTrayDocumentSelectors';
import { getIsCreatingFromInTray } from '../selectors/billSelectors';
import DocumentViewer from '../../../components/DocumentViewer/DocumentViewer';
import PageView from '../../../components/PageView/PageView';
import styles from './BillDocumentViewer.module.css';

const BillDocumentViewer = ({
  onCloseSplitViewButtonClick,
  onUnlinkDocumentButtonClick,
  inTrayDocument,
  hasInTrayDocumentUrl,
  inTrayDocumentUrl,
  isCreatingFromInTray,
}) => (
  <Aside
    header={(
      <Aside.Header>
        <Aside.Title>
          Source document uploaded&nbsp;
          {inTrayDocument.uploadedDate}
        </Aside.Title>
        <div className={styles.buttonGroup}>
          <Button onClick={onCloseSplitViewButtonClick} type="link" icon={<Icons.Collapse />}>
            Close split view
          </Button>
          { !isCreatingFromInTray && (
            <Button onClick={onUnlinkDocumentButtonClick} type="link" icon={<Icons.UnLink />}>
              Unlink
            </Button>
          )}
        </div>
      </Aside.Header>
    )}
  >
    <PageView
      isLoading={!hasInTrayDocumentUrl}
      view={(
        <DocumentViewer src={inTrayDocumentUrl} type="application/pdf" />
      )}
    />
  </Aside>
);

const mapStateToProps = state => ({
  inTrayDocument: getInTrayDocument(state),
  hasInTrayDocumentUrl: getHasInTrayDocumentUrl(state),
  inTrayDocumentUrl: getInTrayDocumentUrl(state),
  isCreatingFromInTray: getIsCreatingFromInTray(state),
});

export default connect(mapStateToProps)(BillDocumentViewer);
