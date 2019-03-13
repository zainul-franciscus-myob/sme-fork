import BankingMappings from './BankingMapping';
import BusinessMapping from './BusinessMapping';
import ContactMapping from './ContactMapping';
import GeneralJournalMapping from './GeneralJournalMapping';
import IncomeAllocationMapping from './IncomeAllocationMapping';
import NavigationMapping from './NavigationMapping';
import QuoteMapping from './QuoteMapping';
import ReceiveMoneyMapping from './ReceiveMoneyMapping';
import SpendMoneyMapping from './SpendMoneyMapping';
import TaxMapping from './TaxMapping';
import TransactionListMapping from './TransactionListMapping';
import TransferMoneyMapping from './TransferMoneyMapping';

const RootMapping = Object.freeze({
  ...BankingMappings,
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...ReceiveMoneyMapping,
  ...SpendMoneyMapping,
  ...TaxMapping,
  ...TransactionListMapping,
  ...TransferMoneyMapping,
});

export default RootMapping;
