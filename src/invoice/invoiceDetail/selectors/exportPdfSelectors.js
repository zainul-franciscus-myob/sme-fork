import {
  getBusinessId, getInvoiceId, getIsCreating, getIsPageEdited,
} from './invoiceDetailSelectors';

export const getExportPdfTemplate = state => state.exportPdf.template;

export const getExportPdfUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const invoiceId = getInvoiceId(state);

  return { businessId, invoiceId };
};

export const getExportPdfQueryParams = state => ({
  formName: getExportPdfTemplate(state),
});

export const getShouldSaveAndExportPdf = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};
