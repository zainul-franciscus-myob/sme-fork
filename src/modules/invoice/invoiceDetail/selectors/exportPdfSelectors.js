import { createSelector } from 'reselect';

import {
  getBusinessId,
  getInvoiceId,
  getInvoiceNumber,
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

export const getExportPdfQueryParams = (state) => ({
  formName: getExportPdfTemplate(state),
});

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

export const getShowExportPdfButton = createSelector(getLayout, (layout) =>
  [InvoiceLayout.SERVICE, InvoiceLayout.ITEM_AND_SERVICE].includes(layout)
);
