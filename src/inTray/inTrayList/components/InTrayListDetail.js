import {
  Aside,
  Button,
  ButtonRow,
  Dropdown,
  Icons,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getActiveEntry } from '../selectors/InTrayListSelectors';
import { getDocumentViewerUrl } from '../selectors/InTraySelectors';
import DocumentViewer from '../../../components/DocumentViewer/DocumentViewer';
import actionTypes from '../actionTypes';

const items = [
  <Dropdown.Item
    key={actionTypes.createBill}
    label="Create bill"
    value={actionTypes.createBill}
  />,
  <Dropdown.Item
    key={actionTypes.createSpendMoney}
    label="Create spend money transaction"
    value={actionTypes.createSpendMoney}
  />,
];

const InTrayListDetail = ({
  onClose, handleActionSelect, activeEntryId, uploadedDate, documentViewerUrl,
}) => (
  <Aside
    header={(
      <Aside.Header>
        <Aside.Title icon={<Icons.Invoice set="lg" />}>
            Document uploaded
          {' '}
          {uploadedDate}
        </Aside.Title>
        <Aside.Button onClick={onClose} icon={<Icons.Close />} />
      </Aside.Header>
    )}
    footer={(
      <ButtonRow>
        <Button
          type="secondary"
          onClick={() => handleActionSelect(activeEntryId)(actionTypes.linkToExistingBill)}
        >
          Link to existing bill
        </Button>
        <Dropdown
          top
          right
          onSelect={handleActionSelect(activeEntryId)}
          toggle={(
            <Dropdown.Toggle>
              Create
              <Icons.Caret />
            </Dropdown.Toggle>
          )}
          items={items}
        />
      </ButtonRow>
)}
  >
    <DocumentViewer src={documentViewerUrl} contentType="application/pdf" />
  </Aside>
);

const mapStateToProps = state => ({
  ...getActiveEntry(state),
  documentViewerUrl: getDocumentViewerUrl(state),
});

export default connect(mapStateToProps)(InTrayListDetail);
