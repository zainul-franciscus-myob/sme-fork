import { getDefaultTemplateOption } from './customerStatementListSelectors';

export const getBusinessId = state => state.businessId;

export const getQueryParamsForList = (state) => {
  const { sortOrder, orderBy, filterOptions } = state;
  const { selectedCustomerId, showZeroAmount } = filterOptions;

  return {
    selectedCustomerId,
    showZeroAmount,
    sortOrder,
    orderBy,
  };
};

export const getDownloadPDFQueryParams = (state, templateOption) => ({
  ...state.templateAdditionalOptions,
  sortOrder: state.sortOrder,
  orderBy: state.orderBy,
  templateOption,
  customerUids: state.customerStatements
    .filter(({ isSelected }) => isSelected)
    .map(({ payerUid }) => payerUid),
});

const getSelectedTemplateOptionForEmail = (state) => {
  const { selectedTemplateOption } = state.emailModalOptions;
  const defaultTemplateOption = getDefaultTemplateOption(state);
  return selectedTemplateOption || defaultTemplateOption;
};

export const getSendEmailContent = state => ({
  ...state.templateAdditionalOptions,
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
