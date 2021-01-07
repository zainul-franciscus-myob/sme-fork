import {
  Alert,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Input,
  Modal,
  Separator,
  SubHeadingGroup,
  Tooltip,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';

import {
  getAlert,
  getBillPaymentOptions,
  getIsActionsDisabled,
  getIsPaymentAmountEdited,
  getIsPaymentModalLoading,
  getIsRemittanceAdviceEnabled,
  getShouldSendRemittanceAdvice,
} from '../selectors/BillRecordPaymentSelectors';
import { getSupplierId } from '../selectors/billSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../components/Calculator/Calculator';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import LoadingPageState from '../../../../components/LoadingPageState/LoadingPageState';
import SupplierPaymentDetailsStatus from './SupplierPaymentDetailsStatus';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './BillRecordPaymentModal.module.css';

const onDateChange = (handler) => (key) => ({ value }) =>
  handler({ key, value });

const onInputFieldChange = (handler) => ({
  target: { name: key, rawValue: value },
}) => handler({ key, value });

const OverPaidInfoMessage = ({ overAmount }) => (
  <>
    <p>
      This payment will create a&nbsp;
      <b>{overAmount}</b>
      &nbsp;debit.
    </p>
    <div>
      Go to <b>Supplier returns</b> to apply the debit to an open bill or record
      a refund.
    </div>
  </>
);

const BillRecordPaymentModal = ({
  supplierId,
  accountId,
  accounts,
  alert,
  bankStatementText,
  balanceDue,
  billNumber,
  discountAmount,
  discountedBalance,
  isActionsDisabled,
  isBeforeStartOfFinancialYear,
  isElectronicPayment,
  isModalLoading,
  isPaymentAmountEdited,
  isRemittanceAdviceEnabled,
  issueDate,
  onCancel,
  onChangeBankStatementText,
  onEditSupplierClick,
  onUpdateBankStatementText,
  onUpdateBillPaymentAmountFields,
  onUpdateHeaderOption,
  onUpdateIsElectronicPayment,
  onRecordMultiplePayments,
  onRecordPaymentModalOpen,
  onSaveBillPayment,
  onShouldSendRemittanceAdviceChange,
  overAmount,
  paidAmount,
  paymentDate,
  shouldSendRemittanceAdvice,
  shouldShowSupplierPopover,
  showElectronicPayments,
  supplierName,
}) => {
  const [showDiscount, setShowDiscount] = useState(false);
  const requiredLabel = 'This is required';
  const requiredBankStatementText =
    'This will appear on your supplier’s bank statement to help identify the payment';

  useEffect(() => {
    if (supplierId) {
      onRecordPaymentModalOpen();
    }
  }, [onRecordPaymentModalOpen, supplierId]);

  if (isModalLoading) {
    return (
      <Modal title="Record payment" onCancel={onCancel}>
        <LoadingPageState size="medium" />
        <Modal.Footer />
      </Modal>
    );
  }

  return (
    <Modal className="payment-modal" title="Record payment" onCancel={onCancel}>
      <Modal.Body>
        {alert && <Alert type={alert.type}>{alert.message}</Alert>}
        <Box display="flex">
          <Box className={styles.subHeadingGroup}>
            <SubHeadingGroup size="md" subHeading="Issue Date">
              {issueDate}
            </SubHeadingGroup>
            <SubHeadingGroup size="md" subHeading="Bill number">
              {billNumber}
            </SubHeadingGroup>
            <SubHeadingGroup size="md" subHeading="Supplier">
              {supplierName}
            </SubHeadingGroup>
          </Box>
          <Box flex="auto"></Box>
          <Box flexGrow="1" flexShrink="0">
            <SubHeadingGroup
              className={styles.rightSubHeading}
              size="md"
              subHeading="Balance due"
            >
              <Heading variant="lg" as="div">
                {formatCurrency(balanceDue)}
              </Heading>
            </SubHeadingGroup>
          </Box>
        </Box>
        <Separator className={styles.divider} />
        <Box display="flex" flexWrap="wrap">
          {showElectronicPayments && (
            <Box paddingRight="md">
              <CheckboxGroup
                label="Electronic Payment"
                hideLabel
                renderCheckbox={() => (
                  <Checkbox
                    name="isElectronicPayment"
                    label="Electronic payment"
                    checked={isElectronicPayment}
                    labelAccessory={
                      <Tooltip placement="right">
                        Payment will be added to the bank file payments list
                      </Tooltip>
                    }
                    onChange={handleCheckboxChange(
                      onUpdateIsElectronicPayment,
                      'isElectronicPayment'
                    )}
                  />
                )}
              />
            </Box>
          )}
          {shouldShowSupplierPopover && (
            <SupplierPaymentDetailsStatus
              onEditSupplierClick={onEditSupplierClick}
            />
          )}
        </Box>
        {isElectronicPayment && (
          <Input
            name="bankStatementText"
            label="Statement text"
            value={bankStatementText}
            onChange={handleInputChange(onChangeBankStatementText)}
            onBlur={handleInputChange(onUpdateBankStatementText)}
            requiredLabel={requiredBankStatementText}
            maxLength={18}
            width="lg"
          />
        )}
        <Box className={styles.fieldGroup}>
          <AccountCombobox
            label="Bank account"
            hideLabel={false}
            items={accounts}
            className={styles.bankAccount}
            selectedId={accountId}
            disabled={isElectronicPayment}
            onChange={handleComboboxChange('accountId', onUpdateHeaderOption)}
            width="xl"
          />
          <Box className={styles.paymentDate}>
            <DatePicker
              label="Date"
              name="Date"
              value={paymentDate}
              displayWarning={isBeforeStartOfFinancialYear}
              warningMessage={'The date is set to a previous financial year'}
              onSelect={onDateChange(onUpdateHeaderOption)('paymentDate')}
              requiredLabel={requiredLabel}
              width="sm"
            />
          </Box>
        </Box>
        <Box className={styles.fieldGroup}>
          {showDiscount && (
            <>
              <Calculator
                autoFocus
                textAlign="right"
                name="discountAmount"
                value={discountAmount}
                onChange={onInputFieldChange(onUpdateBillPaymentAmountFields)}
                onBlur={onInputFieldChange(onUpdateBillPaymentAmountFields)}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
                label="Discount ($)"
                width="md"
              />
              <Calculator
                disabled
                textAlign="right"
                name="discountedBalance"
                value={discountedBalance}
                numeralDecimalScaleMin={2}
                numeralDecimalScaleMax={2}
                label="Discounted balance ($)"
                width="md"
              />
            </>
          )}
          <Calculator
            textAlign="right"
            name="paidAmount"
            value={paidAmount}
            infoBody={
              overAmount && <OverPaidInfoMessage overAmount={overAmount} />
            }
            width="md"
            onChange={onInputFieldChange(onUpdateBillPaymentAmountFields)}
            onBlur={onInputFieldChange(onUpdateBillPaymentAmountFields)}
            numeralDecimalScaleMin={2}
            numeralDecimalScaleMax={2}
            label="Amount paid ($)"
            requiredLabel={requiredLabel}
            errorMessage={
              (!paidAmount || Number(paidAmount) === 0) && isPaymentAmountEdited
                ? 'Amount paid is required'
                : null
            }
          />
          {!showDiscount && (
            <Button type="link" onClick={() => setShowDiscount(true)}>
              Apply discount
            </Button>
          )}
        </Box>
        {isRemittanceAdviceEnabled && (
          <>
            <Separator></Separator>
            <Checkbox
              name="shouldSendRemittanceAdvice"
              label="Send remittance advice"
              checked={shouldSendRemittanceAdvice}
              onChange={handleCheckboxChange(
                onShouldSendRemittanceAdviceChange
              )}
            />
            {shouldSendRemittanceAdvice && (
              <Box marginTop="xs">
                <Alert type="info">
                  You&#39;ll have the option to send by email or export a PDF
                  when you save this payment.&nbsp;
                  <a
                    href="https://help.myob.com/wiki/x/TA5XAw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                </Alert>
              </Box>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button type="link" onClick={onRecordMultiplePayments}>
          Multiple payments
        </Button>
        <Box flex="auto"></Box>
        <Button
          type="secondary"
          onClick={onCancel}
          disabled={isActionsDisabled}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onSaveBillPayment}
          disabled={isActionsDisabled}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  ...getBillPaymentOptions(state),
  supplierId: getSupplierId(state),
  alert: getAlert(state),
  isModalLoading: getIsPaymentModalLoading(state),
  isActionsDisabled: getIsActionsDisabled(state),
  isPaymentAmountEdited: getIsPaymentAmountEdited(state),
  shouldSendRemittanceAdvice: getShouldSendRemittanceAdvice(state),
  isRemittanceAdviceEnabled: getIsRemittanceAdviceEnabled(state),
});

export default connect(mapStateToProps)(BillRecordPaymentModal);
