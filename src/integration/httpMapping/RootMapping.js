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
  ...BusinessMapping,
  ...ContactMapping,
  ...GeneralJournalMapping,
  ...IncomeAllocationMapping,
  ...NavigationMapping,
  ...QuoteMapping,
  ...ReceiveMoneyMapping,
  ...SpendMoneyMapping,
  ...TransactionListMapping,
  ...TransferMoneyMapping,
  ...TaxMapping,
});

export default RootMapping;
