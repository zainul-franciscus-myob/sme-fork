import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsUpgradeModalShowing,
  getMonthlyLimit,
} from '../selectors/billDetailsSelectors';

const pluraliseBillsLimit = limit => (limit === 1 ? '1 bill' : `${limit} bills`);

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
        title="Need to record more bills?"
        size="small"
        onCancel={onUpgradeModalDismiss}
      >
        <Modal.Body>
          <p>
            You’ve reached your monthly limit of
            {' '}
            {pluraliseBillsLimit(monthlyLimit.limit)}
            {' '}
            for
            {' '}
            {monthlyLimit.month}
            .
          </p>
          <p>
            Upgrade your subscription to record more bills.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button type="secondary" onClick={onUpgradeModalDismiss}>Cancel</Button>
          <Button type="primary" onClick={onUpgradeModalUpgradeButtonClick}>Upgrade now</Button>
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
