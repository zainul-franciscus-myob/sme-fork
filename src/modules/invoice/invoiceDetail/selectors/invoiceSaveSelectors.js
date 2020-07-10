import { createSelector } from 'reselect';

import {
  getAmountDue,
  getIsCreating,
  getIsPageEdited,
} from './invoiceDetailSelectors';
import InvoiceStatus from '../types/InvoiceStatus';

const getIsClosedInvoice = (state) =>
  state.invoice.status === InvoiceStatus.CLOSED;
const getIsEditingClosedInvoice = createSelector(
  getIsClosedInvoice,
  getIsPageEdited,
  (isClosedInvoice, isPageEdited) => isClosedInvoice && isPageEdited
);

const getIsCreatingNegativeAmountDue = createSelector(
  getIsCreating,
  getAmountDue,
  (isCreating, amountDue) => isCreating && Number(amountDue) < 0
);

const getOriginalAmountDue = (state) => state.originalAmountDue;
const getIsOpenInvoice = (state) => state.invoice.status === InvoiceStatus.OPEN;
const getIsEditingOpenInvoiceToNegativeAmountDue = createSelector(
  getIsOpenInvoice,
  getIsPageEdited,
  getAmountDue,
  getOriginalAmountDue,
  (isOpenInvoice, isPageEdited, amountDue, originalAmountDue) =>
    isOpenInvoice &&
    isPageEdited &&
    Number(originalAmountDue) >= 0 &&
    Number(amountDue) < 0
);

export const shouldShowSaveAmountDueWarningModal = createSelector(
  getIsEditingClosedInvoice,
  getIsCreatingNegativeAmountDue,
  getIsEditingOpenInvoiceToNegativeAmountDue,
  (
    isEditingClosedInvoice,
    isCreatingNegativeAmountDue,
    isEditingOpenInvoiceToNegativeAmountDue
  ) =>
    isEditingClosedInvoice ||
    isCreatingNegativeAmountDue ||
    isEditingOpenInvoiceToNegativeAmountDue
);

export const getSaveAmountDueWarningModalBody = (state) => {
  if (getIsEditingClosedInvoice(state)) {
    const amountDue = getAmountDue(state);

    if (Number(amountDue) === 0) {
      return 'There is a payment recorded against this invoice. Are you sure you want to save the changes?';
    }

    if (Number(amountDue) < 0) {
      return "If you save, you'll be creating a customer credit as the balance due is negative.";
    }

    return "If you save, you'll be changing the invoice status to open as there is now a balance due.";
  }

  return "If you save, you'll be creating a customer credit as the balance due is negative.";
};

export const getSaveAndCreateNewModalBody = (state) => {
  if (shouldShowSaveAmountDueWarningModal(state)) {
    return getSaveAmountDueWarningModalBody(state);
  }

  return 'This will save your current invoice and create a new invoice. This means you will no longer be able to change the customer.';
};

export const getSaveAndDuplicateModalBody = (state) => {
  if (shouldShowSaveAmountDueWarningModal(state)) {
    return getSaveAmountDueWarningModalBody(state);
  }

  return "This will save your current invoice and create a new invoice with the same information. This means you'll no longer be able to change the customer.";
};
