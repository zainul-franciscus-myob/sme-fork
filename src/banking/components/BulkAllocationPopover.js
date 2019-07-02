import { Button, ButtonRow, Popover } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBulkAllocationAccounts,
  getBulkAllocationOptions,
  getTaxCodes,
} from '../bankingSelectors/bulkAllocationSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import TaxCodeCombobox from '../../components/combobox/TaxCodeCombobox';
import style from './BankingView.css';

const onComboBoxChange = (handler, key) => (item) => {
  const { id } = item;
  handler({ key, value: id });
};

const BulkAllocationPopover = ({
  taxCodes,
  bulkAllocationAccounts,
  bulkAllocationOptions,
  onUpdateBulkAllocationOption,
  onSaveBulkAllocation,
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
        onChange={onComboBoxChange(onUpdateBulkAllocationOption, 'accountId')}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel={false}
        name="taxCodeId"
        items={taxCodes}
        selectedId={bulkAllocationOptions.taxCodeId}
        onChange={onComboBoxChange(onUpdateBulkAllocationOption, 'taxCodeId')}
      />
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
      appendTarget={`.${style.popover}`}
    >
      <Button type="secondary">Allocate</Button>
    </Popover>
  );
};

const mapStateToProps = state => ({
  taxCodes: getTaxCodes(state),
  bulkAllocationAccounts: getBulkAllocationAccounts(state),
  bulkAllocationOptions: getBulkAllocationOptions(state),
});

export default connect(mapStateToProps)(BulkAllocationPopover);
