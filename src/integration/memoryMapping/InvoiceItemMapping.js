import {
  LOAD_NEW_INVOICE_ITEM_DETAIL,
} from '../../invoice/invoiceDetail/invoiceItem/InvoiceItemIntents';

const loadNewInvoiceItemDetail = ({ onSuccess }) => {
  onSuccess('New invoice item');
};

const InvoiceItemMapping = {
  [LOAD_NEW_INVOICE_ITEM_DETAIL]: loadNewInvoiceItemDetail,
};

export default InvoiceItemMapping;
