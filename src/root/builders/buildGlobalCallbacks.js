export default ({ closeTasks }) => ({
  businessDetailsConfirmed: () => closeTasks({ closeEvent: 'businessDetailsConfirmed' }),
  usersInvited: () => closeTasks({ closeEvent: 'usersInvited' }),
  pageLoaded: moduleName => closeTasks({ closeEvent: `${moduleName}Loaded` }),
  setupBusinessDetails: () => closeTasks({ closeEvent: 'setupBusinessDetails' }),
  updatedEmailSettings: () => closeTasks({ closeEvent: 'updatedEmailSettings' }),
  customisedEmailDefaults: () => closeTasks({ closeEvent: 'customisedEmailDefaults' }),
  addedPaymentDetails: () => closeTasks({ closeEvent: 'addedPaymentDetails' }),
  uploadedLogo: () => closeTasks({ closeEvent: 'uploadedLogo' }),
  learnPayrollCompleted: () => closeTasks({ closeEvent: 'learnPayrollCompleted' }),
  learnInTrayCompleted: () => closeTasks({ closeEvent: 'learnInTrayCompleted' }),
  learnBankingCompleted: () => closeTasks({ closeEvent: 'learnBankingCompleted' }),
  learnEmployeeCompleted: () => closeTasks({ closeEvent: 'learnEmployeeCompleted' }),
  inTrayBillSaved: () => closeTasks({ closeEvent: 'inTrayBillSaved' }),
  inTrayUploadOptionsClosed: () => closeTasks({ closeEvent: 'inTrayUploadOptionsClosed' }),
  payrollGeneralSettingsSaved: () => closeTasks({ closeEvent: 'payrollGeneralSettingsSaved' }),
  employeeDetailsSaved: () => closeTasks({ closeEvent: 'employeeDetailsSaved' }),
  invoiceSaved: () => closeTasks({ closeEvent: 'invoiceSaved' }),
  // Though the 'bankFeedsUpdated' event itself is not listened to by any tasks, it does trigger the
  // bank feed data to be fed back into app-state so the tasks can react to changes.
  bankFeedsUpdated: () => closeTasks({ closeEvent: 'bankFeedsUpdated', force: true }),
});
