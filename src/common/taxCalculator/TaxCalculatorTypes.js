import {
  BillFlow, ConnectedLedgerFlow, InvoiceFlow, OrderFlow, QuoteFlow,
} from '@myob/tax-calculator';

const TaxCalculatorHandlers = {
  invoice: new InvoiceFlow(),
  order: new OrderFlow(),
  receiveMoney: new ConnectedLedgerFlow(),
  spendMoney: new ConnectedLedgerFlow(),
  generalJournal: new ConnectedLedgerFlow(),
  bill: new BillFlow(),
  quote: new QuoteFlow(),
};

export default TaxCalculatorHandlers;
