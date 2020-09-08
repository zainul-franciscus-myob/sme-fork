import { Alert, Button, Modal, ReadOnly, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTransferMoneyModal } from '../tabs/transferMoney/transferMoneySelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import PageView from '../../../components/PageView/PageView';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const TransferMoneyModal = ({
  transferFrom,
  transferTo,
  transferFromDisplayName,
  transferToDisplayName,
  transferDisplayType,
  accountList,
  amount,
  formattedDate,
  description,
  modalAlert,
  isModalBlocking,
  onUpdateTransfer,
  onDismissModalAlert,
  onCancel,
  onConfirm,
}) => {
  const alertComponent = modalAlert && (
    <Alert type={modalAlert.type} onDismiss={onDismissModalAlert}>
      {modalAlert.message}
    </Alert>
  );

  const view = (
    <>
      {alertComponent}
      <ReadOnly name="Date" label="Date">
        {formattedDate}
      </ReadOnly>
      {transferDisplayType === 'transferFrom' ? (
        <AccountCombobox
          label="Bank account from"
          requiredLabel="This is required"
          hideLabel={false}
          items={accountList}
          selectedId={transferFrom}
          onChange={handleComboboxChange('transferFrom', onUpdateTransfer)}
          hintText="Select an account"
        />
      ) : (
        <ReadOnly name="TransferFrom" label="Bank account from">
          {transferFromDisplayName}
        </ReadOnly>
      )}
      {transferDisplayType === 'transferTo' ? (
        <AccountCombobox
          label="Bank account to"
          requiredLabel="This is required"
          hideLabel={false}
          items={accountList}
          selectedId={transferTo}
          onChange={handleComboboxChange('transferTo', onUpdateTransfer)}
          hintText="Select an account"
        />
      ) : (
        <ReadOnly name="TransferTo" label="Bank account to">
          {transferToDisplayName}
        </ReadOnly>
      )}
      <ReadOnly name="Amount" label="Amount ($)">
        {amount}
      </ReadOnly>
      <TextArea
        name="description"
        label="Description of transaction"
        value={description}
        onChange={handleInputChange(onUpdateTransfer)}
        rows={1}
        autoSize
        maxLength={255}
        resize="vertical"
      />
    </>
  );
  return (
    <Modal title="Create transfer money" size="small" onCancel={onCancel}>
      <Modal.Body>
        <PageView isLoading={isModalBlocking} view={view} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCancel} disabled={isModalBlocking}>
          Cancel
        </Button>
        <Button onClick={onConfirm} disabled={isModalBlocking}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => getTransferMoneyModal(state);

export default connect(mapStateToProps)(TransferMoneyModal);
