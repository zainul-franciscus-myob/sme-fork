export default ({ closeTasks }) => ({
  businessDetailsConfirmed: () => closeTasks({ closeEvent: 'businessDetailsConfirmed' }),
  usersInvited: () => closeTasks({ closeEvent: 'usersInvited' }),
  pageLoaded: moduleName => closeTasks({ closeEvent: `${moduleName}Loaded` }),
  setupBusinessDetails: () => closeTasks({ closeEvent: 'setupBusinessDetails' }),
  updatedEmailSettings: () => closeTasks({ closeEvent: 'updatedEmailSettings' }),
  addedPaymentDetails: () => closeTasks({ closeEvent: 'addedPaymentDetails' }),
  uploadedLogo: () => closeTasks({ closeEvent: 'uploadedLogo' }),
});
