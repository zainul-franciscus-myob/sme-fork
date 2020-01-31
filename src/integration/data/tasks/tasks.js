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
    title: 'Review accounts list',
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
];