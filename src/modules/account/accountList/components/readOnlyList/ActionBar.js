import {
  Button,
  ButtonRow,
  Popover,
  Select,
  Separator,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountAllowedToMoveDown,
  getAccountAllowedToMoveUp,
  getAccountMoveToTargets,
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
  moveToTargets,
  onMoveToChange,
  shouldDisableMoveTo,
}) => {
  const noMoveLocations = moveToTargets.length <= 1;
  const tooManyAccountsSelected = numSelected > 125;

  const MoveToDropdown = () =>
    shouldDisableMoveTo || tooManyAccountsSelected || noMoveLocations ? (
      <Tooltip
        trigger={['hover', 'focus']}
        triggerContent={
          <div className={styles.moveToSelect}>
            <Select
              className={styles.disabledBtn}
              name="moveTo"
              label=""
              defaultValue="placeholder"
              width="sm"
              hideLabel
            >
              <Select.Option value="placeholder" label="Move to..." disabled />
            </Select>
          </div>
        }
      >
        You can’t move this selection of accounts. Please make a different
        selection
      </Tooltip>
    ) : (
      <div className={styles.moveToSelect}>
        <Select
          name="moveTo"
          label=""
          defaultValue="placeholder"
          width="sm"
          hideLabel
          onChange={(e) => onMoveToChange(e.target.value)}
        >
          <Select.Option value="placeholder" label="Move to..." disabled />
          {moveToTargets.map((account) => {
            const indent = '\u00a0'.repeat((account.level - 1) * 2);
            return (
              <Select.Option
                key={account.id}
                value={account.id}
                label={indent + account.accountName}
                disabled={account.isParentOfSelectedAccounts}
              />
            );
          })}
        </Select>
      </div>
    );

  const TaxCodesPopover = () =>
    tooManyAccountsSelected ? (
      <Tooltip
        trigger={['hover', 'focus']}
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
    );

  const DeleteButton = () =>
    tooManyAccountsSelected ? (
      <Tooltip
        trigger={['hover', 'focus']}
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
    );

  const MoveUpButton = () =>
    accountAllowedToMoveUp ? (
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

  const MoveDownButton = () =>
    accountAllowedToMoveDown ? (
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
      {hasFlexibleAccountNumbers && <MoveToDropdown />}

      <TaxCodesPopover />

      <div className="flx-pl-sm flx-pr-sm flex__row">
        <Separator direction="vertical" />
      </div>

      <DeleteButton />

      {!hasFlexibleAccountNumbers && (
        <>
          <MoveUpButton />
          <MoveDownButton />
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
  moveToTargets: getAccountMoveToTargets(state),
});

export default connect(mapStateToProps)(ActionBar);
