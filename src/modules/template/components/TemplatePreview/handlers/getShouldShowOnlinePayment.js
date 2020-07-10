import { PreviewType } from '../../../templateOptions';

const getShouldShowOnlinePayment = (previewType) =>
  previewType === PreviewType.Invoice;

export default getShouldShowOnlinePayment;
