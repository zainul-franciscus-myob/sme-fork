import { Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsUpgradeModalShowing,
  getMonthlyLimit,
} from '../selectors/invoiceDetailSelectors';

const pluraliseInvoiceLimit = limit => (limit === 1 ? '1 invoice' : `${limit} invoices`);

const UpgradeModal = (props) => {
  const {
    isUpgradeModalShowing,
    monthlyLimit,
    onUpgradeModalDismiss,
    onUpgradeModalUpgradeButtonClick,
  } = props;

  return (isUpgradeModalShowing
    ? (
      <Modal
        title="Need to send more invoices?"
        canClose={false}
        size="small"
      >
        <Modal.Body>
          <p>
            You’ve reached your monthly limit of
            {' '}
            {pluraliseInvoiceLimit(monthlyLimit.limit)}
            .
          </p>
          <p>
            Upgrade your subscription to send more invoices.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-default"
            onClick={onUpgradeModalDismiss}
          >
              Go back
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onUpgradeModalUpgradeButtonClick}
          >
              Upgrade now
          </button>
        </Modal.Footer>
      </Modal>
    ) : null
  );
};

const mapStateToProps = state => ({
  monthlyLimit: getMonthlyLimit(state),
  isUpgradeModalShowing: getIsUpgradeModalShowing(state),
});

export default connect(mapStateToProps)(UpgradeModal);
