export const resetOpenSendEmailParam = state => ({
  ...state,
  openSendEmail: 'false',
});

export const resetEmailInvoiceDetail = state => ({
  ...state,
  emailInvoice: state.emailInvoiceDefaultState,
});

export const updateEmailInvoiceDetail = (state, action) => ({
  ...state,
  emailInvoice: {
    ...state.emailInvoice,
    [action.key]: action.value,
  },
});
