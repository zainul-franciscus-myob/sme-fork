import { getBusinessId, getInvoiceId, getInvoiceNumber } from './invoiceDetailSelectors';

export const getExportPdfTemplate = state => state.exportPdf.template;

export const getExportPdfUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const invoiceId = getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getExportPdfQueryParams = state => ({
  formName: getExportPdfTemplate(state),
});

export const getExportPdfFilename = (state) => {
  const invoiceNumber = getInvoiceNumber(state);

  return `${invoiceNumber}.pdf`;
};
