import { Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsUpgradeModalShowing,
  getMonthlyLimit,
} from '../selectors/billDetailsSelectors';

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
        canClose={false}
      >
        <Modal.Body>
          <p>
            It looks like you’ve reached your monthly limit of
            {' '}
            {monthlyLimit.limit}
            {' '}
            bills.
          </p>
          <p>
            But don’t worry! If you need to record more than
            {' '}
            {monthlyLimit.limit}
            {' '}
            bills a month it’s easy to upgrade your current subscription.
          </p>
          <p>
            Click
            {' '}
            <strong>Upgrade now</strong>
            {' '}
            to find out more.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-default"
            onClick={onUpgradeModalDismiss}
          >
              Cancel
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
