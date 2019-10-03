import { LINK_DOCUMENT_TO_BILL, LOAD_LINK_BILL, SORT_AND_FILTER_BILL_LIST } from '../../linkBill/LinkBillIntents';
import loadFilteredLinkBillListResponse from '../data/linkBill/loadFilteredLinkBillList';
import loadLinkBillResponse from '../data/linkBill/loadLinkBillResponse';
import successMessage from '../data/success.json';

const loadLinkBill = ({ onSuccess }) => onSuccess(loadLinkBillResponse);
const loadFilteredLinkBillList = ({ onSuccess }) => onSuccess(loadFilteredLinkBillListResponse);
const linkDocumentToBill = ({ onSuccess }) => onSuccess(successMessage);

const LinkBillMapping = {
  [LOAD_LINK_BILL]: loadLinkBill,
  [SORT_AND_FILTER_BILL_LIST]: loadFilteredLinkBillList,
  [LINK_DOCUMENT_TO_BILL]: linkDocumentToBill,
};

export default LinkBillMapping;
