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
    <Button type="secondary" onClick={onAccountMoveUpClick}>
      Move up a level
    </Button>
  ) : (
    <Tooltip
      className={styles.moveButton}
      triggerContent={
        <Button type="secondary" as="a" disabled>
          Move up a level
        </Button>
      }
    >
      {cannotMoveAccountUpMessage}
    </Tooltip>
  );

  const moveDownButton = accountAllowedToMoveDown ? (
    <Button type="secondary" onClick={onAccountMoveDownClick}>
      Move down a level
    </Button>
  ) : (
    <Tooltip
      className={styles.moveButton}
      triggerContent={
        <Button type="secondary" as="a" disabled>
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
            <Button className={styles.disabledTaxCodeBtn} type="secondary">
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

      <Button
        type="secondary"
        onClick={onDeleteClick}
        disabled={tooManyAccountsSelected}
      >
        Delete accounts
      </Button>
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
