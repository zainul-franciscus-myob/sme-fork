import {
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  OPEN_ATTACHMENT,
  PREFILL_DATA_FROM_IN_TRAY,
  REMOVE_ATTACHMENT,
  UPDATE_SPEND_MONEY,
  UPLOAD_ATTACHMENT,
} from '../../spendMoney/SpendMoneyIntents';
import attachmentDetailResponse from '../data/spendMoney/attachmentDetail';
import spendMoneyCalculatedTotals from '../data/spendMoney/spendMoneyDetailTotalsResponse';
import spendMoneyDetailEntry from '../data/spendMoney/spendMoneyDetailEntry';
import spendMoneyDetailPrefillResponse from '../data/spendMoney/spendMoneyDetailPrefill.json';
import spendMoneyNewEntry from '../data/spendMoney/spendMoneyDetailNewEntry';
import spendMoneyReferenceId from '../data/spendMoney/spendMoneyDetailReferenceId';
import successResponse from '../data/success.json';
import uploadAttachmentResponse from '../data/spendMoney/uploadAttachmentResponse';

const newSpendMoney = ({ onSuccess }) => onSuccess(spendMoneyNewEntry);

const saveSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const deleteSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const updateSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const getSpendMoneyNextReferenceId = ({ onSuccess }) => onSuccess(spendMoneyReferenceId);

const getCalculatedTotals = ({ onSuccess }) => onSuccess(spendMoneyCalculatedTotals);

const loadSpendMoneyDetail = ({ onSuccess }) => onSuccess(spendMoneyDetailEntry);

const uploadAttachment = ({ onSuccess }) => onSuccess(uploadAttachmentResponse);

const removeAttachment = ({ onSuccess }) => onSuccess(successResponse);

const openAttachment = ({ onSuccess }) => onSuccess(attachmentDetailResponse);

const downloadInTrayDocument = ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' }));

const prefillDataFromInTray = ({ onSuccess }) => onSuccess(spendMoneyDetailPrefillResponse);

const SpendMoneyMapping = {
  [LOAD_NEW_SPEND_MONEY]: newSpendMoney,
  [CREATE_SPEND_MONEY]: saveSpendMoney,
  [DELETE_SPEND_MONEY]: deleteSpendMoney,
  [UPDATE_SPEND_MONEY]: updateSpendMoney,
  [LOAD_REFERENCE_ID]: getSpendMoneyNextReferenceId,
  [GET_CALCULATED_TOTALS]: getCalculatedTotals,
  [LOAD_SPEND_MONEY_DETAIL]: loadSpendMoneyDetail,
  [UPLOAD_ATTACHMENT]: uploadAttachment,
  [REMOVE_ATTACHMENT]: removeAttachment,
  [OPEN_ATTACHMENT]: openAttachment,
  [DOWNLOAD_IN_TRAY_DOCUMENT]: downloadInTrayDocument,
  [PREFILL_DATA_FROM_IN_TRAY]: prefillDataFromInTray,
};

export default SpendMoneyMapping;
