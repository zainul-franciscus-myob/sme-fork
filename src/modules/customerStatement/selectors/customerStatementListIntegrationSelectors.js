import { getDefaultTemplateOption } from './customerStatementListSelectors';

export const getBusinessId = (state) => state.businessId;

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
  customerIds: state.customerStatements
    .filter(({ isSelected }) => isSelected)
    .map(({ id }) => id),
});

const getSelectedTemplateOptionForEmail = (state) => {
  const { selectedTemplateOption } = state.emailModalOptions;
  const defaultTemplateOption = getDefaultTemplateOption(state);
  return selectedTemplateOption || defaultTemplateOption;
};

const getStatementEmail = (statement) => {
  const { email: strEmail = '' } = statement;

  return strEmail.split(';').reduce((emails, str = '') => {
    const email = str.trim();

    return email ? [...emails, email] : emails;
  }, []);
};

const getToEmail = (statements) => {
  return statements
    .filter(({ isSelected }) => isSelected)
    .reduce((acc, statement) => {
      const { payerUid } = statement;
      const emails = getStatementEmail(statement);
      const entries = emails.length
        ? emails.map((email) => ({ payerUid, email }))
        : [{ payerUid, email: '' }];

      return [...acc, ...entries];
    }, []);
};

export const getSendEmailContent = (state) => ({
  ...state.templateAdditionalOptions,
  fromEmail: state.emailModalOptions.fromEmail,
  subject: state.emailModalOptions.subject,
  message: state.emailModalOptions.message,
  templateOption: getSelectedTemplateOptionForEmail(state),
  toEmail: getToEmail(state.customerStatements),
});
