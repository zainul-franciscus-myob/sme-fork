import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountList,
  getIsRecodeLoading,
  getIsRecodeOpen,
  getRecodeOptions,
  getSelectedText,
} from '../findAndRecodeSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Popover from '../../../../components/Feelix/Popover/Popover';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import styles from './RecodePopover.module.css';

const RecodePopover = ({
  accounts,
  isRecodeOpen,
  recodeOptions,
  isRecodeLoading,
  selectedText,
  onOpenRecode,
  onUpdateRecodeOptions,
  onCloseRecode,
  onRecode,
}) => {
  const body = (
    <AccountCombobox
      label="Account"
      hideLabel={false}
      name="accountId"
      hintText="Select an account"
      items={accounts}
      requiredLabel="This field is required"
      selectedId={recodeOptions.accountId}
      onChange={handleComboboxChange('accountId', onUpdateRecodeOptions)}
      disabled={isRecodeLoading}
    />
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
        onOuterAction={() => isRecodeOpen && onCloseRecode()}
        isOpen={isRecodeOpen}
      >
        <Button
          type="secondary"
          onClick={onOpenRecode}
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
  isRecodeOpen: getIsRecodeOpen(state),
  recodeOptions: getRecodeOptions(state),
  isRecodeLoading: getIsRecodeLoading(state),
  selectedText: getSelectedText(state),
});

export default connect(mapStateToProps)(RecodePopover);
