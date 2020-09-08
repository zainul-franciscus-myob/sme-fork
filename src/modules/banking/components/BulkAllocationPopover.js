import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBulkAllocationAccounts,
  getBulkAllocationOptions,
  getIsBulkOpen,
  getTaxCodes,
} from '../selectors/bulkActionSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import Popover from '../../../components/Feelix/Popover/Popover';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';
import styles from './BankingView.module.css';

const onComboBoxChange = (handler, key) => (item) => {
  const { id } = item;
  handler({ key, value: id });
};

const BulkAllocationPopover = ({
  taxCodes,
  bulkAllocationAccounts,
  bulkAllocationOptions,
  isBulkOpen,
  onUpdateBulkAllocationOption,
  onSaveBulkAllocation,
  onCloseBulkAllocation,
  onOpenBulkAllocation,
}) => {
  const body = (
    <React.Fragment>
      <AccountCombobox
        label="Account"
        hideLabel={false}
        name="accountId"
        hintText="Select an account"
        items={bulkAllocationAccounts}
        selectedId={bulkAllocationOptions.accountId}
        requiredLabel="This field is required"
        onChange={onComboBoxChange(onUpdateBulkAllocationOption, 'accountId')}
      />
      <div className={styles.taxComboBoxWidth}>
        <TaxCodeCombobox
          label="Tax code"
          hideLabel={false}
          name="taxCodeId"
          items={taxCodes}
          selectedId={bulkAllocationOptions.taxCodeId}
          requiredLabel="This field is required"
          onChange={onComboBoxChange(onUpdateBulkAllocationOption, 'taxCodeId')}
        />
      </div>
    </React.Fragment>
  );

  const footer = (
    <ButtonRow>
      <Button onClick={onSaveBulkAllocation}>Allocate</Button>
    </ButtonRow>
  );

  return (
    <Popover
      body={<Popover.Body child={body} />}
      footer={<Popover.Footer child={footer} />}
      closeOnOuterAction
      preferPlace="below"
      onOuterAction={() => onCloseBulkAllocation(isBulkOpen)}
      isOpen={isBulkOpen}
    >
      <Button
        type="secondary"
        className={styles.allocateButton}
        onClick={onOpenBulkAllocation}
      >
        Allocate
      </Button>
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  taxCodes: getTaxCodes(state),
  bulkAllocationAccounts: getBulkAllocationAccounts(state),
  bulkAllocationOptions: getBulkAllocationOptions(state),
  isBulkOpen: getIsBulkOpen(state),
});

export default connect(mapStateToProps)(BulkAllocationPopover);
