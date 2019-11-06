import React from 'react';

import AccountName from './AccountName';
import AccountNotes from './AccountNotes';
import AccountNumber from './AccountNumber';
import HeaderAccountTypeSection from './HeaderAccountTypeSection';
import ParentHeaderSelect from './ParentHeaderSelect';
import ShowSubTotal from './ShowSubTotal';

const HeaderView = ({
  onAccountTypeChange,
  onAccountDetailsChange,
  onAccountNumberChange,
  onAccountNumberBlur,
}) => (
  <React.Fragment>
    <HeaderAccountTypeSection onChange={onAccountTypeChange} />
    <ParentHeaderSelect onChange={onAccountDetailsChange} />
    <AccountNumber
      onChange={onAccountNumberChange}
      onBlur={onAccountNumberBlur}
    />
    <AccountName onChange={onAccountDetailsChange} />
    <AccountNotes onChange={onAccountDetailsChange} />
    <ShowSubTotal onChange={onAccountDetailsChange} />
  </React.Fragment>
);

export default HeaderView;
