import { createSelector } from 'reselect';

import {
  getBusinessId,
  getInvoiceId,
  getInvoiceNumber,
  getIsForeignCurrency,
  getIsModalActionDisabled,
  getLayout,
  getModalType,
} from './invoiceDetailSelectors';
import InvoiceDetailModalType from '../types/InvoiceDetailModalType';
import InvoiceLayout from '../types/InvoiceLayout';

export const getExportPdfTemplate = (state) => state.exportPdf.template;

export const getExportPdfUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const invoiceId = getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getExportPdfFilename = (state) => {
  const invoiceNumber = getInvoiceNumber(state);

  return `${invoiceNumber}.pdf`;
};

export const getIsExportingPDF = createSelector(
  getModalType,
  getIsModalActionDisabled,
  (modalType, isModalActionDisabled) =>
    modalType === InvoiceDetailModalType.EXPORT_PDF && isModalActionDisabled
);

export const getShowExportPdfButton = createSelector(
  getLayout,
  getIsForeignCurrency,
  (layout, isForeignCurrency) =>
    [InvoiceLayout.SERVICE, InvoiceLayout.ITEM_AND_SERVICE].includes(layout) &&
    !isForeignCurrency
);
