export default ({ closeTasks, loadTasks }) => ({
  businessDetailsConfirmed: () =>
    closeTasks({ closeEvent: 'businessDetailsConfirmed' }),
  usersInvited: () => closeTasks({ closeEvent: 'usersInvited' }),
  pageLoaded: (moduleName) => closeTasks({ closeEvent: `${moduleName}Loaded` }),
  setupBusinessDetailsCompleted: () =>
    closeTasks({ closeEvent: 'setupBusinessDetailsCompleted' }),
  updatedEmailSettings: () =>
    closeTasks({ closeEvent: 'updatedEmailSettings' }),
  customisedEmailDefaults: () =>
    closeTasks({ closeEvent: 'customisedEmailDefaults' }),
  addedPaymentDetailsSaved: () =>
    closeTasks({ closeEvent: 'addedPaymentDetailsSaved' }),
  uploadedLogo: () => closeTasks({ closeEvent: 'uploadedLogo' }),
  learnPayrollCompleted: () =>
    closeTasks({ closeEvent: 'learnPayrollCompleted' }),
  learnInTrayCompleted: () =>
    closeTasks({ closeEvent: 'learnInTrayCompleted' }),
  learnBankingCompleted: () =>
    closeTasks({ closeEvent: 'learnBankingCompleted' }),
  learnEmployeeCompleted: () =>
    closeTasks({ closeEvent: 'learnEmployeeCompleted' }),
  inTrayBillSaved: () => closeTasks({ closeEvent: 'inTrayBillSaved' }),
  inTrayUploadOptionsClosed: () =>
    closeTasks({ closeEvent: 'inTrayUploadOptionsClosed' }),
  payrollGeneralSettingsSaved: () =>
    closeTasks({ closeEvent: 'payrollGeneralSettingsSaved' }),
  employeeDetailsSaved: () =>
    closeTasks({ closeEvent: 'employeeDetailsSaved' }),
  invoiceSaved: () => closeTasks({ closeEvent: 'invoiceSaved' }),
  purchaseOrderSaved: () => closeTasks({ closeEvent: 'purchaseOrderSaved' }),
  reviewInvoiceTemplateCompleted: () =>
    closeTasks({ closeEvent: 'reviewInvoiceTemplateCompleted' }),
  // Though the 'bankFeedsUpdated' event itself is not listened to by any tasks, it does trigger the
  // bank feed data to be fed back into app-state so the tasks can react to changes.
  bankFeedsUpdated: () =>
    closeTasks({ closeEvent: 'bankFeedsUpdated', force: true }),
  smartMEUpdated: () => closeTasks({ closeEvent: 'smartMEUpdated' }),
  refreshTaskEvent: (compareEnergyBill) => loadTasks(compareEnergyBill),
  closeTask: (closeEvent) => closeTasks({ closeEvent }),
});
