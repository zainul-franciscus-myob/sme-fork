import {
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_SPEND_MONEY,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  LOAD_SUPPLIER_EXPENSE_ACCOUNT,
  OPEN_ATTACHMENT,
  PREFILL_DATA_FROM_IN_TRAY,
  REMOVE_ATTACHMENT,
  UPDATE_SPEND_MONEY,
  UPLOAD_ATTACHMENT,
} from '../SpendMoneyIntents';
import abnDetail from './data/abnDetail';
import attachmentDetailResponse from './data/attachmentDetail';
import createSpendMoneyResponse from './data/createSpendMoney';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedContactResponse from './data/loadAddedContactResponse';
import loadAddedJobResponse from './data/loadAddedJobResponse';
import newDuplicateSpendMoneyDetailEntry from './data/loadNewDuplicateSpendMoneyDetailEntry';
import spendMoneyDetailEntry from './data/spendMoneyDetailEntry';
import spendMoneyDetailPrefillResponse from './data/spendMoneyDetailPrefill';
import spendMoneyNewEntry from './data/spendMoneyDetailNewEntry';
import spendMoneyReferenceId from './data/spendMoneyDetailReferenceId';
import successResponse from './data/successResponse';
import supplierExpenseAccountId from './data/supplierExpenseAccountId';
import uploadAttachmentResponse from './data/uploadAttachmentResponse';

const newSpendMoney = ({ onSuccess }) => onSuccess(spendMoneyNewEntry);

const newDuplicatedSpendMoney = ({ onSuccess }) => onSuccess(newDuplicateSpendMoneyDetailEntry);

const createSpendMoney = ({ onSuccess }) => onSuccess(createSpendMoneyResponse);

const deleteSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const updateSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const getSpendMoneyNextReferenceId = ({ onSuccess }) => onSuccess(spendMoneyReferenceId);

const loadSpendMoneyDetail = ({ onSuccess }) => onSuccess(spendMoneyDetailEntry);

const uploadAttachment = ({ onSuccess }) => onSuccess(uploadAttachmentResponse);

const removeAttachment = ({ onSuccess }) => onSuccess(successResponse);

const openAttachment = ({ onSuccess }) => onSuccess(attachmentDetailResponse);

const downloadInTrayDocument = ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' }));

const prefillDataFromInTray = ({ onSuccess }) => onSuccess(spendMoneyDetailPrefillResponse);

const linkInTrayDocument = ({ onSuccess }) => onSuccess(successResponse);

const MemorySpendMoneyMapping = {
  [LOAD_NEW_SPEND_MONEY]: newSpendMoney,
  [CREATE_SPEND_MONEY]: createSpendMoney,
  [DELETE_SPEND_MONEY]: deleteSpendMoney,
  [UPDATE_SPEND_MONEY]: updateSpendMoney,
  [LOAD_REFERENCE_ID]: getSpendMoneyNextReferenceId,
  [LOAD_SUPPLIER_EXPENSE_ACCOUNT]: ({ onSuccess }) => onSuccess(supplierExpenseAccountId),
  [LOAD_SPEND_MONEY_DETAIL]: loadSpendMoneyDetail,
  [LOAD_NEW_DUPLICATE_SPEND_MONEY]: newDuplicatedSpendMoney,
  [UPLOAD_ATTACHMENT]: uploadAttachment,
  [REMOVE_ATTACHMENT]: removeAttachment,
  [OPEN_ATTACHMENT]: openAttachment,
  [DOWNLOAD_IN_TRAY_DOCUMENT]: downloadInTrayDocument,
  [LOAD_JOB_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedJobResponse),
  [PREFILL_DATA_FROM_IN_TRAY]: prefillDataFromInTray,
  [LINK_IN_TRAY_DOCUMENT]: linkInTrayDocument,
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [LOAD_CONTACT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedContactResponse),
  [LOAD_ABN_FROM_CONTACT]: ({ onSuccess }) => onSuccess(abnDetail),
};

export default MemorySpendMoneyMapping;
