import {
  LOAD_BUSINESS_DETAIL,
  UPDATE_BUSINESS_DETAIL,
} from '../invoiceBusinessIntents';
import invoiceBusinessDetails from './data/invoiceBusinessDetails';
import success from './data/success.json';

const updateBusinessDetails = ({ onSuccess }) => onSuccess(success);
const loadBusinessDetail = ({ onSuccess }) => onSuccess(invoiceBusinessDetails);

const MemoryInvoiceBusinessMapping = {
  [LOAD_BUSINESS_DETAIL]: loadBusinessDetail,
  [UPDATE_BUSINESS_DETAIL]: updateBusinessDetails,
};

export default MemoryInvoiceBusinessMapping;
