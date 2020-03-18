import { createSelector } from 'reselect';

import {
  getBillId, getBillLayout, getBillNumber, getBusinessId, getIsCreating, getIsPageEdited,
} from './billSelectors';
import BillLayout from '../types/BillLayout';


export const getExportPdfTemplate = state => state.exportPdf.template;

const getServiceTemplateOptions = state => state.serviceTemplateOptions.templateOptions;
const getItemTemplateOptions = state => state.itemTemplateOptions.templateOptions;
export const getExportPdfTemplateOptions = createSelector(
  getBillLayout,
  getServiceTemplateOptions,
  getItemTemplateOptions,
  (layout, serviceTemplateOptions, itemTemplateOptions) => (layout === BillLayout.SERVICE
    ? serviceTemplateOptions
    : itemTemplateOptions),
);

export const getExportPdfUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const billId = getBillId(state);

  return { businessId, billId };
};

export const getExportPdfQueryParams = state => ({
  formName: getExportPdfTemplate(state),
});

export const getShouldSaveAndReload = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};

export const getExportPdfFilename = (state) => {
  const billNumber = getBillNumber(state);

  return `${billNumber}.pdf`;
};
