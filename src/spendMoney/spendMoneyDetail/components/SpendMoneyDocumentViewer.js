import { Aside, Button, Icons } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInTrayDocumentFileUrl, getInTrayDocumentUploadedDate } from '../spendMoneyDetailSelectors';
import DocumentViewer from '../../../components/DocumentViewer/DocumentViewer';
import styles from './SpendMoneyDocumentViewer.module.css';

const SpendMoneyDocumentViewer = ({
  onCloseSplitView,
  documentUploadedDate,
  documentFileUrl,
}) => {
  const documentViewer = documentFileUrl && (
    <DocumentViewer
      src={documentFileUrl}
      className={styles.documentViewer}
    />
  );

  return (
    <Aside
      header={(
        <Aside.Header>
          <Aside.Title>
            {`Source document uploaded ${documentUploadedDate}`}
          </Aside.Title>
          <div className={styles.actionButtonWrapper}>
            <Button
              onClick={onCloseSplitView}
              type="link"
              icon={<Icons.Collapse />}
            >
            Close split view
            </Button>
          </div>
        </Aside.Header>
    )}
    >
      {documentViewer}
    </Aside>
  );
};

const mapStateToProps = state => ({
  documentFileUrl: getInTrayDocumentFileUrl(state),
  documentUploadedDate: getInTrayDocumentUploadedDate(state),
});

export default connect(mapStateToProps)(SpendMoneyDocumentViewer);
