import {
  DOWNLOAD_PDF, LOAD_CUSTOMER_STATEMENTS, SEND_EMAIL, SORT_AND_FILTER_CUSTOMER_STATEMENTS,
} from '../CustomerStatementIntents';
import customerStatements from './data/loadCustomerStatements';
import filteredCustomerStatements from './data/filteredCustomerStatements';
import success from './data/success.json';

const loadCustomerStatements = ({ onSuccess }) => onSuccess(customerStatements);
const filterCustomerStatements = ({ onSuccess }) => onSuccess(filteredCustomerStatements);
const sendEmail = ({ onSuccess }) => onSuccess(success);
const downloadPDF = ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' }));

const MemoryCustomerStatementMapping = {
  [LOAD_CUSTOMER_STATEMENTS]: loadCustomerStatements,
  [SORT_AND_FILTER_CUSTOMER_STATEMENTS]: filterCustomerStatements,
  [SEND_EMAIL]: sendEmail,
  [DOWNLOAD_PDF]: downloadPDF,
};

export default MemoryCustomerStatementMapping;
