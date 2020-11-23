import {
  InvoiceFlow,
  OrderFlow,
  PurchasesFlow,
  QuoteFlow,
  SalesFlow,
} from '@myob/tax-calculator';

import calculateCreditDebitTotals from './calculateCreditDebitTotals';
import calculateLineTotals from './calculateLineTotals';

const TaxCalculatorHandlers = {
  invoice: { flow: new InvoiceFlow(), buildTotals: calculateLineTotals },
  order: { flow: new OrderFlow(), buildTotals: calculateLineTotals },
  receiveMoney: {
    flow: new SalesFlow(),
    buildTotals: calculateLineTotals,
  },
  spendMoney: { flow: new PurchasesFlow(), buildTotals: calculateLineTotals },
  generalJournalPurchases: {
    flow: new PurchasesFlow(),
    buildTotals: calculateCreditDebitTotals,
  },
  generalJournalSales: {
    flow: new SalesFlow(),
    buildTotals: calculateCreditDebitTotals,
  },
  bill: { flow: new PurchasesFlow(), buildTotals: calculateLineTotals },
  purchaseOrder: {
    flow: new PurchasesFlow(),
    buildTotals: calculateLineTotals,
  },
  quote: { flow: new QuoteFlow(), buildTotals: calculateLineTotals },
};

export default TaxCalculatorHandlers;
