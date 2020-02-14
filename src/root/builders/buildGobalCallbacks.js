export default ({ closeTasks }) => ({
  businessDetailsConfirmed: () => closeTasks({ closeEvent: 'businessDetailsConfirmed' }),
  usersInvited: () => closeTasks({ closeEvent: 'usersInvited' }),
  pageLoaded: moduleName => closeTasks({ closeEvent: `${moduleName}Loaded` }),
  setupBusinessDetails: () => closeTasks({ closeEvent: 'setupBusinessDetails' }),
  learnInTrayCompleted: () => closeTasks({ closeEvent: 'learnInTrayCompleted' }),
  updatedEmailSettings: () => closeTasks({ closeEvent: 'updatedEmailSettings' }),
  customisedEmailDefaults: () => closeTasks({ closeEvent: 'customisedEmailDefaults' }),
  addedPaymentDetails: () => closeTasks({ closeEvent: 'addedPaymentDetails' }),
  uploadedLogo: () => closeTasks({ closeEvent: 'uploadedLogo' }),
  inTrayBillSaved: () => closeTasks({ closeEvent: 'inTrayBillSaved' }),
});
