import {
  Alert,
  Button,
  Icons,
  Modal,
  Select,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getTaxPayItemAccounts,
  getTaxPayItemAtoReportingCategoryList,
  getTaxPayItemDetail,
  getTaxPayItemModalAlertMessage,
  getTaxPayItemModalLoading,
  getTaxPayItemModalSubmitting,
} from '../../selectors/PayrollTaxSelectors';
import AccountCombobox from '../../../../../../components/combobox/AccountCombobox';
import PageView from '../../../../../../components/PageView/PageView';
import handleComboboxChange from '../../../../../../components/handlers/handleComboboxChange';
import handleSelectChange from '../../../../../../components/handlers/handleSelectChange';

const TaxPayItemModal = ({
  alertMessage,
  isLoading,
  isSubmitting,
  taxPayItemDetail,
  accounts,
  atoReportCategoryList,
  onCloseModal,
  onTaxPayItemModalDetailChange,
  onTaxPayItemModalSaveButtonClick,
  onDismissTaxPayItemModalAlertMessage,
}) => {
  const alertView = alertMessage && (
    <Alert type="danger" onDismiss={onDismissTaxPayItemModalAlertMessage}>
      {alertMessage}
    </Alert>
  );

  const view = (
    <>
      <Modal.Body>
        {alertView}
        <AccountCombobox
          label="Linked payables account"
          hideLabel={false}
          items={accounts}
          selectedId={taxPayItemDetail.accountId}
          onChange={handleComboboxChange(
            'accountId',
            onTaxPayItemModalDetailChange
          )}
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />} placement="bottom">
              This account will track the amount of PAYG that is withheld from
              employee pays. We recommend to use the default one we suggested
              for you.
            </Tooltip>
          }
        />
        <Select
          name="atoReportingCategory"
          label="ATO reporting category"
          value={taxPayItemDetail.atoReportingCategory}
          onChange={handleSelectChange(onTaxPayItemModalDetailChange)}
          labelAccessory={
            <Tooltip triggerContent={<Icons.Info />} placement="bottom">
              Select the ATO reporting category if you&apos;re using Single
              Touch Payroll.
            </Tooltip>
          }
        >
          {atoReportCategoryList.map((category) => (
            <Select.Option
              key={category.value}
              value={category.value}
              label={category.name}
            />
          ))}
        </Select>
      </Modal.Body>
      <Modal.Footer>
        <Button type="secondary" onClick={onCloseModal} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onTaxPayItemModalSaveButtonClick}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </>
  );

  return (
    <Modal title="PAYG Withholding" size="small" onCancel={onCloseModal}>
      <PageView isLoading={isLoading} view={view} />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isLoading: getTaxPayItemModalLoading(state),
  isSubmitting: getTaxPayItemModalSubmitting(state),
  alertMessage: getTaxPayItemModalAlertMessage(state),
  taxPayItemDetail: getTaxPayItemDetail(state),
  accounts: getTaxPayItemAccounts(state),
  atoReportCategoryList: getTaxPayItemAtoReportingCategoryList(state),
});

export default connect(mapStateToProps)(TaxPayItemModal);
