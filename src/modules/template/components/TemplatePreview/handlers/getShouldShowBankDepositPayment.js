import { PreviewType } from '../../../templateOptions';

const getShouldShowBankDepositPayment = ({
  previewType,
  isAllowPaymentByDirectDeposit,
}) => isAllowPaymentByDirectDeposit && previewType !== PreviewType.Quote;

export default getShouldShowBankDepositPayment;
