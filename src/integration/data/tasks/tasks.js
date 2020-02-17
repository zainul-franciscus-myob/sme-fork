export default (region, cdfguid) => [
  {
    action: `/#/${region}/${cdfguid}/dashboard?appcue=-LwVnYlAyZs8fgnratzU`,
    description: 'Welcome',
    key: 'welcome',
    title: 'Welcome',
    closeEvent: 'welcomeViewed',
    isComplete: false,
    template: 'welcome',
  },
  {
    action: `/#/${region}/${cdfguid}?appcue=-Lu0kKUp1O4HTa0FQ_VI`,
    description:
      "Double-check your client's details and add any missing information",
    key: 'businessDetails',
    title: 'Confirm business details',
    closeEvent: 'businessDetailsConfirmed',
    isComplete: false,
    template: 'drawer',
  },
  {
    action: `/#/${region}/${cdfguid}/account?appcue=-Lu0msE2mc6XUByI2ivu`,
    description:
      'Ensure the right accounts are setup for easy allocation in the future',
    key: 'accounts',
    title: 'Review chart of accounts',
    closeEvent: 'accountsListReviewed',
    isComplete: false,
    template: 'drawer',
  },
  {
    action: `/#/${region}/${cdfguid}/bankFeeds?appcue=-Lu0o5bSsiZT5Z7Zrm0m`,
    description:
      'Connect your clients to their bank to get transactions directly into MYOB',
    key: 'bankFeeds',
    title: 'Setup bank feeds',
    isComplete: false,
    template: 'drawer',
  },
  {
    action: `/#/${region}/${cdfguid}/user?appcue=-Lu0nUopXoWrmExP62mP`,
    description:
      'Give your clients access to their software so they can get down to business',
    key: 'inviteUsers',
    title: 'Invite users',
    closeEvent: 'usersInvited',
    isComplete: false,
    template: 'drawer',
  },
  {
    action: `/#/${region}/${cdfguid}/invoiceBusinessSettings`,
    description: 'First impressions matter and we’ll make sure yours is a beauty',
    key: 'personaliseInvoice',
    title: 'Build your invoice template',
    closeEvent: 'personalisedInvoices',
    isComplete: false,
    template: 'drawer',
    tasks: [
      {
        action: `/#/${region}/${cdfguid}/invoiceBusinessSettings`,
        title: 'Add business details',
        closeEvent: 'addedBusinessDetails',
        isComplete: false,
        template: 'drawer',
      },
      {
        action: `/#/${region}/${cdfguid}/invoiceLogoSettings`,
        title: 'Upload your logo',
        closeEvent: 'uploadedLogo',
        isComplete: false,
        template: 'drawer',
      },
      {
        action: `/#/${region}/${cdfguid}/invoicePaymentSettings`,
        title: 'Add invoice payment details',
        closeEvent: 'addedPaymentDetails',
        isComplete: false,
        template: 'drawer',
      },
      {
        action: `/#/${region}/${cdfguid}/invoiceEmailSettings`,
        title: 'Customise email defaults',
        closeEvent: 'customisedEmailDefaults',
        isComplete: false,
        template: 'drawer',
      },
    ],
  },
];
