import { PreviewType } from '../../../templateOptions';

const getShouldShowChequePayment = ({ previewType, isAllowPaymentByCheque }) =>
  isAllowPaymentByCheque && previewType !== PreviewType.Quote;

export default getShouldShowChequePayment;
