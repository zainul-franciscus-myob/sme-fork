import {
  Button,
  ButtonRow,
  Popover,
  Separator,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountAllowedToMoveDown,
  getAccountAllowedToMoveUp,
  getCannotMoveAccountDownMessage,
  getCannotMoveAccountUpMessage,
  getHasFlexibleAccountNumbers,
  getTaxCodeList,
} from '../../AccountListSelectors';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';
import styles from '../AccountListTable.module.css';

const ActionBar = ({
  accountAllowedToMoveUp,
  onAccountMoveUpClick,
  cannotMoveAccountUpMessage,
  accountAllowedToMoveDown,
  onAccountMoveDownClick,
  cannotMoveAccountDownMessage,
  hasFlexibleAccountNumbers,
  numSelected,
  taxCodeList,
  onDeleteClick,
  onBulkUpdateTaxCodeChange,
  onBulkUpdateTaxCodeSaveClick,
  onBulkUpdateTaxCodeOpen,
}) => {
  const moveUpButton = accountAllowedToMoveUp ? (
    <Button
      className={styles.moveButton}
      type="secondary"
      onClick={onAccountMoveUpClick}
    >
      Move up a level
    </Button>
  ) : (
    <Tooltip
      trigger="hover"
      triggerContent={
        <Button className={styles.disabledMoveButton} type="secondary">
          Move up a level
        </Button>
      }
    >
      {cannotMoveAccountUpMessage}
    </Tooltip>
  );

  const moveDownButton = accountAllowedToMoveDown ? (
    <Button
      className={styles.moveButton}
      type="secondary"
      onClick={onAccountMoveDownClick}
    >
      Move down a level
    </Button>
  ) : (
    <Tooltip
      trigger="hover"
      triggerContent={
        <Button className={styles.disabledMoveButton} type="secondary">
          Move down a level
        </Button>
      }
    >
      {cannotMoveAccountDownMessage}
    </Tooltip>
  );

  const tooManyAccountsSelected = numSelected > 125;

  const TaxCodeBody = () => (
    <TaxCodeCombobox
      name={'taxCode'}
      label="Tax code"
      items={taxCodeList}
      onChange={onBulkUpdateTaxCodeChange}
      width="sm"
      requiredLabel="This field is required"
    />
  );

  const TaxCodeFooter = () => (
    <ButtonRow>
      <Button type="primary" onClick={onBulkUpdateTaxCodeSaveClick}>
        Edit
      </Button>
    </ButtonRow>
  );

  return (
    <div className={`${styles.actionBar} flex__row`}>
      {tooManyAccountsSelected ? (
        <Tooltip
          trigger="hover"
          triggerContent={
            <Button className={styles.disabledBtn} type="secondary">
              Edit tax code
            </Button>
          }
        >
          You can’t select more than 125 accounts at a time.
        </Tooltip>
      ) : (
        <Popover
          body={<Popover.Body child={<TaxCodeBody />} />}
          footer={<Popover.Footer child={<TaxCodeFooter />} />}
          preferPlace="below"
          closeOnOuterAction
        >
          <Button type="secondary" onClick={onBulkUpdateTaxCodeOpen}>
            Edit tax code
          </Button>
        </Popover>
      )}

      <div className="flx-pl-sm flx-pr-sm flex__row">
        <Separator direction="vertical" />
      </div>

      {tooManyAccountsSelected ? (
        <Tooltip
          trigger="hover"
          triggerContent={
            <Button className={styles.disabledBtn} type="secondary">
              Delete accounts
            </Button>
          }
        >
          You can’t select more than 125 accounts at a time.
        </Tooltip>
      ) : (
        <Button type="secondary" onClick={onDeleteClick}>
          Delete accounts
        </Button>
      )}
      {!hasFlexibleAccountNumbers && (
        <>
          {moveUpButton}
          {moveDownButton}
        </>
      )}
      <span className={styles.actionBarText}>{numSelected} Items selected</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cannotMoveAccountUpMessage: getCannotMoveAccountUpMessage(state),
  cannotMoveAccountDownMessage: getCannotMoveAccountDownMessage(state),
  accountAllowedToMoveUp: getAccountAllowedToMoveUp(state),
  accountAllowedToMoveDown: getAccountAllowedToMoveDown(state),
  taxCodeList: getTaxCodeList(state),
  hasFlexibleAccountNumbers: getHasFlexibleAccountNumbers(state),
});

export default connect(mapStateToProps)(ActionBar);
