import { getDefaultTemplateOption } from './customerStatementListSelectors';
import StatementType from '../StatementType';

export const getBusinessId = state => state.businessId;

const getParams = (sortOrder, orderBy, filterOptions) => {
  const {
    statementType,
    statementDate,
    fromDate,
    toDate,
    includeInvoices,
    selectedCustomerId,
    showZeroAmount,
  } = filterOptions;

  if (statementType === StatementType.INVOICE) {
    return {
      statementType,
      statementDate,
      includeInvoices,
      selectedCustomerId,
      showZeroAmount,
      sortOrder,
      orderBy,
    };
  }

  return {
    statementType,
    fromDate,
    toDate,
    includeInvoices,
    selectedCustomerId,
    showZeroAmount,
    sortOrder,
    orderBy,
  };
};

export const getQueryParams = (state) => {
  const {
    sortOrder,
    orderBy,
    filterOptions,
  } = state;

  return getParams(sortOrder, orderBy, filterOptions);
};

const getAppliedQueryParams = (state) => {
  const {
    sortOrder,
    orderBy,
    appliedFilterOptions,
  } = state;

  return getParams(sortOrder, orderBy, appliedFilterOptions);
};

export const getExportPdfQueryParams = (state, templateOption) => ({
  ...getAppliedQueryParams(state),
  templateOption,
  customerUids: state.customerStatements.filter(({ isSelected }) => isSelected)
    .map(({ payerUid }) => payerUid)
    .join('&customerUids='),
});

const getSelectedTemplateOptionForEmail = (state) => {
  const { selectedTemplateOption } = state.emailModalOptions;
  const defaultTemplateOption = getDefaultTemplateOption(state);
  return selectedTemplateOption || defaultTemplateOption;
};

export const getSendEmailContent = state => ({
  ...state.appliedFilterOptions,
  fromEmail: state.emailModalOptions.fromEmail,
  subject: state.emailModalOptions.subject,
  message: state.emailModalOptions.message,
  templateOption: getSelectedTemplateOptionForEmail(state),
  toEmail: state.customerStatements.filter(({ isSelected }) => isSelected)
    .map(({ payerUid, email }) => ({
      payerUid,
      email,
    })),
});
