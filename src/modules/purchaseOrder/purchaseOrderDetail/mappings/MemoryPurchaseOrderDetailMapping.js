import {
  CREATE_PURCHASE_ORDER,
  DELETE_PURCHASE_ORDER,
  EXPORT_PURCHASE_ORDER_PDF,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_PURCHASE_ORDER,
  LOAD_NEW_PURCHASE_ORDER,
  LOAD_PURCHASE_ORDER,
  LOAD_SUPPLIER_DETAIL,
  SAVE_EMAIL_SETTINGS,
  SEND_EMAIL,
  UPDATE_PURCHASE_ORDER,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../PurchaseOrderIntents';
import createPurchaseOrderResponse from './data/createPurchaseOrderResponse';
import loadAbnDetail from './data/loadAbnDetail';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedJobResponse from './data/loadAddedJobResponse';
import loadItemAndServicePurchaseOrder from './data/loadItemAndServicePurchaseOrder';
import loadItemAndServicePurchaseOrderWithFreight from './data/loadItemAndServicePurchaseOrderWithFreight';
import loadNewDuplicateItemAndServicePurchaseOrder from './data/loadNewDuplicateItemAndServicePurchaseOrder';
import loadNewPurchaseOrder from './data/loadNewPurchaseOrder';
import loadReadOnlyItemAndServicePurchaseOrder from './data/loadReadOnlyItemAndServicePurchaseOrder';
import loadReadOnlyMiscellaneousPurchaseOrder from './data/loadReadOnlyMiscellaneousPurchaseOrder';
import loadReadOnlyProfessionalPurchaseOrder from './data/loadReadOnlyProfessionalPurchaseOrder';
import loadReadOnlyServicePurchaseOrder from './data/loadReadOnlyServicePurchaseOrder';
import loadServicePurchaseOrder from './data/loadServicePurchaseOrder';
import loadServicePurchaseOrderWithFreight from './data/loadServicePurchaseOrderWithFreight';
import loadSupplierDetail from './data/loadSupplierDetail';
import saveEmailSettingsSuccessResponse from './data/saveEmailSettingsSuccessResponse.json';
import successResponse from './data/success';
import updatedLineForItemDetail from './data/updatedLineForItemDetail';
import uploadEmailAttachmentResponse from './data/uploadEmailAttachmentResponse';

const MemoryPurchaseOrderDetailMapping = {
  [LOAD_PURCHASE_ORDER]: ({ urlParams = {}, onSuccess }) => {
    switch (urlParams.purchaseOrderId) {
      case 'miscellaneous-readonly-id':
        onSuccess(loadReadOnlyMiscellaneousPurchaseOrder);
        break;
      case 'professional-readonly-id':
        onSuccess(loadReadOnlyProfessionalPurchaseOrder);
        break;
      case 'service-readonly-id':
        onSuccess(loadReadOnlyServicePurchaseOrder);
        break;
      case 'service-freight-id':
        onSuccess(loadServicePurchaseOrderWithFreight);
        break;
      case 'item-readonly-id':
        onSuccess(loadReadOnlyItemAndServicePurchaseOrder);
        break;
      case 'item-freight-id':
        onSuccess(loadItemAndServicePurchaseOrderWithFreight);
        break;
      case 'service-id':
        onSuccess(loadServicePurchaseOrder);
        break;
      case 'item-id':
      default:
        onSuccess(loadItemAndServicePurchaseOrder);
        break;
    }
  },
  [LOAD_NEW_PURCHASE_ORDER]: ({ onSuccess }) => onSuccess(loadNewPurchaseOrder),
  [LOAD_NEW_DUPLICATE_PURCHASE_ORDER]: ({ onSuccess }) =>
    onSuccess(loadNewDuplicateItemAndServicePurchaseOrder),
  [DELETE_PURCHASE_ORDER]: ({ onSuccess }) => onSuccess(successResponse),
  [CREATE_PURCHASE_ORDER]: ({ onSuccess }) =>
    onSuccess(createPurchaseOrderResponse),
  [UPDATE_PURCHASE_ORDER]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_SUPPLIER_DETAIL]: ({ onSuccess }) => onSuccess(loadSupplierDetail),
  [LOAD_ITEM_DETAIL_FOR_LINE]: ({ onSuccess }) =>
    onSuccess(updatedLineForItemDetail),
  [EXPORT_PURCHASE_ORDER_PDF]: ({ onSuccess }) =>
    onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) =>
    onSuccess(loadAddedAccountResponse),
  [LOAD_JOB_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedJobResponse),
  [LOAD_ABN_FROM_SUPPLIER]: ({ onSuccess }) => onSuccess(loadAbnDetail),
  [SEND_EMAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [SAVE_EMAIL_SETTINGS]: ({ onSuccess }) =>
    onSuccess(saveEmailSettingsSuccessResponse),
  [UPLOAD_EMAIL_ATTACHMENT]: ({ onSuccess }) =>
    onSuccess(uploadEmailAttachmentResponse),
};

export default MemoryPurchaseOrderDetailMapping;
