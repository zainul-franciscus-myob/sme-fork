import { createSelector } from 'reselect';

import { getAmountDue, getIsCreating, getIsPageEdited } from './billSelectors';
import BillStatus from '../types/BillStatus';

const getIsClosedBill = state => state.bill.status === BillStatus.CLOSED;
const getIsEditingClosedBill = createSelector(
  getIsClosedBill,
  getIsPageEdited,
  (isClosedBill, isPageEdited) => isClosedBill && isPageEdited,
);

const getIsCreatingNegativeAmountDue = createSelector(
  getIsCreating,
  getAmountDue,
  (isCreating, amountDue) => isCreating && Number(amountDue) < 0,
);

const getOriginalAmountDue = state => state.totals.originalAmountDue;
const getIsOpenBill = state => state.bill.status === BillStatus.OPEN;
const getIsEditingOpenBillToNegativeAmountDue = createSelector(
  getIsOpenBill,
  getIsPageEdited,
  getAmountDue,
  getOriginalAmountDue,
  (isOpenBill, isPageEdited, amountDue, originalAmountDue) => (
    isOpenBill
      && isPageEdited
      && Number(originalAmountDue) >= 0
      && Number(amountDue) < 0
  ),
);

export const shouldShowSaveAmountDueWarningModal = createSelector(
  getIsEditingClosedBill,
  getIsCreatingNegativeAmountDue,
  getIsEditingOpenBillToNegativeAmountDue,
  (isEditingClosedBill, isCreatingNegativeAmountDue, isEditingOpenBillToNegativeAmountDue) => (
    isEditingClosedBill || isCreatingNegativeAmountDue || isEditingOpenBillToNegativeAmountDue
  ),
);

export const getSaveAmountDueWarningModalBody = state => {
  if (getIsEditingClosedBill(state)) {
    const amountDue = getAmountDue(state);

    if (Number(amountDue) === 0) {
      return 'There is a payment recorded against this bill. Are you sure you want to save the changes?';
    }

    if (Number(amountDue) < 0) {
      return 'If you save, you\'ll be creating a supplier debit as the balance due is negative.';
    }

    return 'If you save, you\'ll be changing the bill status to open as there is now a balance due.';
  }

  return 'If you save, you\'ll be creating a supplier debit as the balance due is negative.';
};

export const getSaveAndCreateNewModalBody = state => {
  if (shouldShowSaveAmountDueWarningModal(state)) {
    return getSaveAmountDueWarningModalBody(state);
  }

  return 'This will save your current bill and create a new bill. This means you will no longer be able to change the supplier.';
};

export const getSaveAndDuplicateModalBody = state => {
  if (shouldShowSaveAmountDueWarningModal(state)) {
    return getSaveAmountDueWarningModalBody(state);
  }

  return 'This will save your current bill and create a new bill with the same information. This means you\'ll no longer be able to change the supplier.';
};
