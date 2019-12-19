import { LINK_DOCUMENT_TO_BILL, LOAD_LINK_BILL, SORT_AND_FILTER_BILL_LIST } from '../LinkBillIntents';
import loadFilteredLinkBillListResponse from './data/loadFilteredLinkBillList';
import loadLinkBillResponse from './data/loadLinkBillResponse';
import successMessage from './data/success.json';

const loadLinkBill = ({ onSuccess }) => onSuccess(loadLinkBillResponse);
const loadFilteredLinkBillList = ({ onSuccess }) => onSuccess(loadFilteredLinkBillListResponse);
const linkDocumentToBill = ({ onSuccess }) => onSuccess(successMessage);

const MemoryLinkBillMapping = {
  [LOAD_LINK_BILL]: loadLinkBill,
  [SORT_AND_FILTER_BILL_LIST]: loadFilteredLinkBillList,
  [LINK_DOCUMENT_TO_BILL]: linkDocumentToBill,
};

export default MemoryLinkBillMapping;
