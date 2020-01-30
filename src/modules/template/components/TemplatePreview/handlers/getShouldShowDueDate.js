import { PreviewType } from '../../../templateOptions';

const getShouldShowDueDate = previewType => previewType === PreviewType.Invoice;

export default getShouldShowDueDate;
