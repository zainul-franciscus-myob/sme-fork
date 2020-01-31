import {
  BillFlow,
  ConnectedLedgerFlow,
  InvoiceFlow,
  OrderFlow,
  QuoteFlow,
} from '@myob/tax-calculator';

import calculateCreditDebitTotals from './calculateCreditDebitTotals';
import calculateTotals from './calculateTotals';

const TaxCalculatorHandlers = {
  invoice: { flow: new InvoiceFlow(), buildTotals: calculateTotals },
  order: { flow: new OrderFlow(), buildTotals: calculateTotals },
  receiveMoney: {
    flow: new ConnectedLedgerFlow(),
    buildTotals: calculateTotals,
  },
  spendMoney: { flow: new ConnectedLedgerFlow(), buildTotals: calculateTotals },
  generalJournal: {
    flow: new ConnectedLedgerFlow(),
    buildTotals: calculateCreditDebitTotals,
  },
  bill: { flow: new BillFlow(), buildTotals: calculateTotals },
  quote: { flow: new QuoteFlow(), buildTotals: calculateTotals },
};

export default TaxCalculatorHandlers;
