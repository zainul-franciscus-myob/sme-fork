import { createSelector } from 'reselect';

import {
  getBillId,
  getBillNumber,
  getBusinessId,
  getIsCreating,
  getIsModalBlocking,
  getIsPageEdited,
  getModalType,
} from './billSelectors';
import ModalType from '../types/ModalType';

export const getExportPdfTemplate = (state) => state.exportPdf.template;
export const getExportPdfTemplateOptions = (state) =>
  state.template.templateOptions;

export const getExportPdfUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const billId = getBillId(state);

  return { businessId, billId };
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
  const billNumber = getBillNumber(state);

  return `${billNumber}.pdf`;
};

export const getIsExportingPDF = createSelector(
  getModalType,
  getIsModalBlocking,
  (modalType, isModalBlocking) =>
    modalType === ModalType.ExportPdf && isModalBlocking
);
