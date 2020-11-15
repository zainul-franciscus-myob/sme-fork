// Account
export const SUCCESSFULLY_SAVED_ACCOUNT = Symbol(
  'A successfully saved account'
);
export const SUCCESSFULLY_DELETED_ACCOUNT = Symbol(
  'A successfully deleted account'
);

// Banking rules
export const SUCCESSFULLY_SAVED_BANKING_RULE = Symbol(
  'Successfully saved banking rule'
);
export const SUCCESSFULLY_DELETED_BANKING_RULE = Symbol(
  'Successfully deleted banking rule'
);

// General journal
export const SUCCESSFULLY_SAVED_GENERAL_JOURNAL = Symbol(
  'A successfully saved general journal entry'
);
export const SUCCESSFULLY_DELETED_GENERAL_JOURNAL = Symbol(
  'A successfully deleted general journal entry'
);
export const DUPLICATE_GENERAL_JOURNAL = Symbol('Duplicate general journal');

// Receive money
export const SUCCESSFULLY_SAVED_RECEIVE_MONEY = Symbol(
  'A successfully saved receive money entry'
);
export const SUCCESSFULLY_DELETED_RECEIVE_MONEY = Symbol(
  'A successfully deleted receive money entry'
);
export const DUPLICATE_RECEIVE_MONEY = Symbol('Duplicate receive money');

// Spend money
export const SUCCESSFULLY_SAVED_SPEND_MONEY = Symbol(
  'A successfully saved spend money entry'
);
export const SUCCESSFULLY_DELETED_SPEND_MONEY = Symbol(
  'A successfully deleted spend money entry'
);
export const SUCCESSFULLY_SAVED_SPEND_MONEY_WITHOUT_LINK = Symbol(
  'A successfully saved spend money entry without link'
);
export const DUPLICATE_SPEND_MONEY = Symbol('Duplicate spend money');
export const PREFILL_NEW_SPEND_MONEY = Symbol('Prefill new');
export const PREFILL_INTRAY_DOCUMENT_FOR_SPEND_MONEY = Symbol(
  'Prefill intray document'
);

// Transfer money
export const SUCCESSFULLY_SAVED_TRANSFER_MONEY = Symbol(
  'A successfully saved transfer money entry'
);
export const SUCCESSFULLY_DELETED_TRANSFER_MONEY = Symbol(
  'A successfully deleted transfer money entry'
);
export const DUPLICATE_TRANSFER_MONEY = Symbol('Duplicate transfer money');

// Bill
export const SUCCESSFULLY_SAVED_BILL = Symbol('Successfully saved a bill');
export const SUCCESSFULLY_DELETED_BILL = Symbol('Successfully deleted a bill');
export const SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK = Symbol(
  'Successfully saved a bill without link'
);
export const DUPLICATE_BILL = Symbol('Duplicate bill');
export const PREFILL_INTRAY_DOCUMENT_FOR_BILL = Symbol(
  'Prefill intray document'
);

// Purchase order
export const SUCCESSFULLY_SAVED_PURCHASE_ORDER = Symbol(
  'Successfully saved a purchase order'
);
export const SUCCESSFULLY_DELETED_PURCHASE_ORDER = Symbol(
  'Successfully deleted a purchase order'
);
export const SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK = Symbol(
  'Successfully saved a purchase order without link'
);

// Remittance Advice
export const SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE = Symbol(
  'Successfully emailed remittance advice'
);
export const SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE = Symbol(
  'Successfully downloaded remittance advice'
);

// Bill payment
export const SUCCESSFULLY_SAVED_BILL_PAYMENT = Symbol(
  'Successfully saved bill payment'
);
export const SUCCESSFULLY_DELETED_BILL_PAYMENT = Symbol(
  'Successfully deleted bill payment'
);

// In tray
export const SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL =
  'Successfully linked document to bill';

// Quote
export const SUCCESSFULLY_SAVED_QUOTE = Symbol('Successfully saved a quote');
export const SUCCESSFULLY_DELETED_QUOTE = Symbol(
  'Successfully deleted a quote'
);
export const SUCCESSFULLY_EMAILED_QUOTE = Symbol('Successfully emailed quote');
export const DUPLICATE_QUOTE = Symbol('Duplicate quote');

// Invoice
export const SUCCESSFULLY_SAVED_INVOICE = Symbol(
  'Successfully saved an invoice'
);
export const SUCCESSFULLY_DELETED_INVOICE = Symbol(
  'Successfully deleted an invoice'
);
export const SUCCESSFULLY_EMAILED_INVOICE = Symbol(
  'Successfully emailed an invoice'
);
export const DUPLICATE_INVOICE = Symbol('Duplicate invoice');

// Invoice payment
export const SUCCESSFULLY_SAVED_INVOICE_PAYMENT = Symbol(
  'Successfully saved invoice payment'
);
export const SUCCESSFULLY_DELETED_INVOICE_PAYMENT = Symbol(
  'Successfully deleted invoice payment'
);

// Inventory
export const SUCCESSFULLY_SAVED_ITEM = Symbol(
  'A successfully saved inventory entry'
);
export const SUCCESSFULLY_DELETED_ITEM = Symbol(
  'A successfully deleted inventory entry'
);

// Supplier returns
export const SUCCESSFULLY_SAVED_PURCHASE_RETURN = Symbol(
  'A successfully saved supplier return purchase'
);
export const SUCCESSFULLY_DELETED_PURCHASE_RETURN = Symbol(
  'A successfully deleted supplier return purchase'
);
export const SUCCESSFULLY_SAVED_RECEIVE_REFUND = Symbol(
  'A successfully saved supplier return refund'
);
export const SUCCESSFULLY_DELETED_RECEIVE_REFUND = Symbol(
  'A successfully deleted supplier return refund'
);

// Pay refund
export const SUCCESSFULLY_SAVED_PAY_REFUND = Symbol(
  'A successfully saved customer return refund'
);
export const SUCCESSFULLY_DELETED_PAY_REFUND = Symbol(
  'A successfully deleted customer return refund'
);

// Apply to sale
export const SUCCESSFULLY_SAVED_APPLY_TO_SALE = Symbol(
  'Successfully saved apply to sale'
);
export const SUCCESSFULLY_DELETED_APPLY_TO_SALE = Symbol(
  'Successfully deleted apply to sale'
);

// Template
export const TEMPLATE_UPDATED = Symbol('Template updated');

// Contact
export const SUCCESSFULLY_SAVED_CONTACT = Symbol(
  'A successfully saved contact entry'
);
export const SUCCESSFULLY_DELETED_CONTACT = Symbol(
  'A successfully deleted contact entry'
);

// Employee
export const SUCCESSFULLY_SAVED_EMPLOYEE = Symbol(
  'A successfully saved employee entry'
);
export const SUCCESSFULLY_DELETED_EMPLOYEE = Symbol(
  'A successfully deleted employee entry'
);
export const SUCCESSFULLY_DELETED_NZ_EMPLOYEE = Symbol(
  'A successfully deleted employee entry'
);
export const SUCCESSFULLY_SAVED_NZ_EMPLOYEE = Symbol(
  'A successfully saved employee entry'
);

// Employee pay
export const SUCCESSFULLY_DELETED_EMPLOYEE_PAY_TRANSACTION = Symbol(
  'Successfully deleted an employee pay transaction'
);

// Pay item
export const SUCCESSFULLY_SAVED_PAY_ITEM = Symbol(
  'Successfully saved a pay item'
);
export const SUCCESSFULLY_DELETED_PAY_ITEM = Symbol(
  'Successfully deleted a pay item'
);
export const SUCCESSFULLY_SAVED_EXPENSE_PAY_ITEM = Symbol(
  'Successfully saved expense pay item'
);
export const SUCCESSFULLY_DELETED_EXPENSE_PAY_ITEM = Symbol(
  'Successfully deleted expense pay item'
);
export const SUCCESSFULLY_SAVED_LEAVE_PAY_ITEM = Symbol(
  'Successfully saved a pay item'
);
export const SUCCESSFULLY_DELETED_LEAVE_PAY_ITEM = Symbol(
  'Successfully deleted a pay item'
);
export const SUCCESSFULLY_SAVED_WAGE_PAY_ITEM = Symbol(
  'Successfully saved a wage pay item'
);
export const SUCCESSFULLY_DELETED_WAGE_PAY_ITEM = Symbol(
  'Successfully deleted a wage pay item'
);
export const SUCCESSFULLY_SAVED_SUPER_PAY_ITEM = Symbol(
  'A successfully saved super pay item'
);
export const SUCCESSFULLY_DELETED_SUPER_PAY_ITEM = Symbol(
  'A successfully deleted super pay item'
);

// Pay run
export const SUCCESSFULLY_SAVED_DRAFT_PAY_RUN = Symbol(
  'Successfully saved draft pay run'
);

// Pay super
export const SUCCESSFULLY_CREATED_SUPER_PAYMENT = Symbol(
  'Successfully created super payment'
);
export const SUCCESSFULLY_REVERSED_TRANSACTION = Symbol(
  'Successfully reversed transaction'
);

// Payroll settings
export const SUCCESSFULLY_SAVED_SUPER_FUND = Symbol(
  'A successfully saved superannuation fund entry'
);
export const SUCCESSFULLY_DELETED_SUPER_FUND = Symbol(
  'A successfully deleted superannuation fund entry'
);

// User
export const SUCCESSFULLY_SAVED_USER = Symbol(
  'A successfully saved user entry'
);
export const SUCCESSFULLY_DELETED_USER = Symbol(
  'A successfully deleted user entry'
);

// Reporting centre
export const SUCCESSFULLY_UPDATED_JOB_KEEPER_PAYMENTS = Symbol(
  'Successfully updated JobKeeper payments'
);

// Job
export const SUCCESSFULLY_SAVED_JOB = Symbol('A successfully saved job');
export const SUCCESSFULLY_DELETED_JOB = Symbol('A successfully deleted job');
