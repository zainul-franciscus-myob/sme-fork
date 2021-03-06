import { Button, Modal } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getPayPeriodEmployeeLimit,
  getUpgradeModalShowing,
} from '../EmployeePayListSelectors';

const pluraliseEmployeeLimit = (limit) =>
  limit === 1 ? '1 employee' : `${limit} employees`;

const UpgradeModal = ({
  isUpgradeModalShowing,
  limit,
  onUpgradeModalDismiss,
  onUpgradeModalUpgradeButtonClick,
}) =>
  isUpgradeModalShowing ? (
    <Modal title="Need to pay more employees?" onCancel={onUpgradeModalDismiss}>
      <Modal.Body>
        <p>
          Your subscription includes payroll for {pluraliseEmployeeLimit(limit)}
          .
        </p>
        <p>Upgrade your subscription to pay additional employees.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onUpgradeModalDismiss}>
          Go back
        </Button>
        <Button type="primary" onClick={onUpgradeModalUpgradeButtonClick}>
          Upgrade now
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;

const mapStateToProps = (state) => ({
  limit: getPayPeriodEmployeeLimit(state).limit,
  isUpgradeModalShowing: getUpgradeModalShowing(state),
});

export default connect(mapStateToProps)(UpgradeModal);
