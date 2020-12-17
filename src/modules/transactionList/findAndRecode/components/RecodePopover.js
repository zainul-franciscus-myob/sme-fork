import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountList,
  getIsRecodeLoading,
  getIsRecodeOptionsOpen,
  getRecodeOptions,
  getSelectedText,
  getTaxCodeList,
} from '../findAndRecodeSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Popover from '../../../../components/Feelix/Popover/Popover';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './RecodePopover.module.css';

const RecodePopover = ({
  accounts,
  isRecodeOptionsOpen,
  taxCodes,
  recodeOptions,
  isRecodeLoading,
  selectedText,
  onOpenRecodeOptions,
  onUpdateRecodeOptions,
  onCloseRecodeOptions,
  onRecode,
}) => {
  const body = (
    <>
      <AccountCombobox
        label="Account"
        hideLabel={false}
        name="accountId"
        items={accounts}
        selectedId={recodeOptions.accountId}
        onChange={handleComboboxChange('accountId', onUpdateRecodeOptions)}
        disabled={isRecodeLoading}
        allowClear
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel={false}
        name="taxCodeId"
        items={taxCodes}
        selectedId={recodeOptions.taxCodeId}
        onChange={handleComboboxChange('taxCodeId', onUpdateRecodeOptions)}
        disabled={isRecodeLoading}
        width="sm"
        allowClear
      />
    </>
  );

  const footer = (
    <ButtonRow>
      <Button onClick={onRecode} disabled={isRecodeLoading}>
        Replace
      </Button>
    </ButtonRow>
  );

  return (
    <>
      <Popover
        body={<Popover.Body child={body} />}
        footer={<Popover.Footer child={footer} />}
        closeOnOuterAction
        preferPlace="below"
        onOuterAction={() => isRecodeOptionsOpen && onCloseRecodeOptions()}
        isOpen={isRecodeOptionsOpen}
      >
        <Button
          type="secondary"
          onClick={onOpenRecodeOptions}
          disabled={isRecodeLoading}
        >
          Replace
        </Button>
      </Popover>
      <div className={styles.selectedText}>{selectedText}</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  accounts: getAccountList(state),
  isRecodeOptionsOpen: getIsRecodeOptionsOpen(state),
  taxCodes: getTaxCodeList(state),
  recodeOptions: getRecodeOptions(state),
  isRecodeLoading: getIsRecodeLoading(state),
  selectedText: getSelectedText(state),
});

export default connect(mapStateToProps)(RecodePopover);
