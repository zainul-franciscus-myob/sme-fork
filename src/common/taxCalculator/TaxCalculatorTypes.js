import {
  InvoiceFlow,
  OrderFlow,
  PurchasesFlow,
  QuoteFlow,
  SalesFlow,
} from '@myob/tax-calculator';

import calculateCreditDebitTotals from './calculateCreditDebitTotals';
import calculateTotals from './calculateTotals';

const TaxCalculatorHandlers = {
  invoice: { flow: new InvoiceFlow(), buildTotals: calculateTotals },
  order: { flow: new OrderFlow(), buildTotals: calculateTotals },
  receiveMoney: {
    flow: new SalesFlow(),
    buildTotals: calculateTotals,
  },
  spendMoney: { flow: new PurchasesFlow(), buildTotals: calculateTotals },
  generalJournalPurchases: {
    flow: new PurchasesFlow(),
    buildTotals: calculateCreditDebitTotals,
  },
  generalJournalSales: {
    flow: new SalesFlow(),
    buildTotals: calculateCreditDebitTotals,
  },
  bill: { flow: new PurchasesFlow(), buildTotals: calculateTotals },
  quote: { flow: new QuoteFlow(), buildTotals: calculateTotals },
};

export default TaxCalculatorHandlers;
