import {
  getBillId, getBillNumber, getBusinessId, getIsCreating, getIsPageEdited,
} from './billSelectors';

export const getExportPdfTemplate = state => state.exportPdf.template;
export const getExportPdfTemplateOptions = state => state.exportPdf.templateOptions;

export const getExportPdfUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const billId = getBillId(state);

  return { businessId, billId };
};

export const getExportPdfQueryParams = state => ({
  formName: getExportPdfTemplate(state),
});

export const getShouldSaveAndExportPdf = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};

export const getExportPdfFilename = (state) => {
  const billNumber = getBillNumber(state);

  return `${billNumber}.pdf`;
};
