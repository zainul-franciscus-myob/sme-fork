import React from 'react';

import AccountName from './AccountName';
import AccountNotes from './AccountNotes';
import AccountNumber from './AccountNumber';
import HeaderAccountTypeSection from './HeaderAccountTypeSection';
import ParentHeaderSelect from './ParentHeaderSelect';
import ShowSubTotal from './ShowSubTotal';

const HeaderView = ({
  onAccountTypeChange,
  onAccountChange,
  onAccountNumberChange,
  onAccountNumberBlur,
}) => (
  <React.Fragment>
    <HeaderAccountTypeSection onChange={onAccountTypeChange} />
    <ParentHeaderSelect onChange={onAccountChange} />
    <AccountNumber
      onChange={onAccountNumberChange}
      onBlur={onAccountNumberBlur}
    />
    <AccountName onChange={onAccountChange} />
    <AccountNotes onChange={onAccountChange} />
    <ShowSubTotal onChange={onAccountChange} />
  </React.Fragment>
);

export default HeaderView;
