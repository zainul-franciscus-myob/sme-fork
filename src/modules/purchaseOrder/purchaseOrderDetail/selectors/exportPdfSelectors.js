import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsModalBlocking,
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

export const getExportPdfFilename = (state) => {
  const purchaseOrderNumber = getPurchaseOrderNumber(state);

  return `${purchaseOrderNumber}.pdf`;
};

export const getIsExportingPDF = createSelector(
  getModalType,
  getIsModalBlocking,
  (modalType, isModalBlocking) =>
    modalType === ModalType.EXPORT_PDF && isModalBlocking
);
