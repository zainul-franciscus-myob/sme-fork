import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsCreating,
  getIsModalBlocking,
  getIsPageEdited,
  getModalType,
  getPurchaseOrderId,
  getPurchaseOrderNumber,
} from './purchaseOrderSelectors';
import ModalType from '../types/ModalType';

export const getExportPdfTemplate = (state) => state.exportPdf.template;
export const getExportPdfTemplateOptions = (state) =>
  state.template.templateOptions;

export const getExportPdfUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const purchaseOrderId = getPurchaseOrderId(state);

  return { businessId, purchaseOrderId };
};

export const getExportPdfQueryParams = (state) => ({
  formName: getExportPdfTemplate(state),
});

export const getShouldSaveAndReload = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};

export const getExportPdfFilename = (state) => {
  const purchaseOrderNumber = getPurchaseOrderNumber(state);

  return `${purchaseOrderNumber}.pdf`;
};

export const getIsExportingPDF = createSelector(
  getModalType,
  getIsModalBlocking,
  (modalType, isModalBlocking) =>
    modalType === ModalType.ExportPdf && isModalBlocking
);
