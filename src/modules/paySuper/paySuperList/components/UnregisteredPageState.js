import { Button, Icons, PageState } from '@myob/myob-widgets';
import React from 'react';

import accessDeniedImage from './images/access-denied.svg';

const UnregisteredPageState = ({ onLinkClick }) => {
  const signUpButton = (
    <Button key={1} type="link" icon={<Icons.Add />} onClick={onLinkClick}>
      Sign up to PaySuper
    </Button>
  );

  return (
    <PageState
      title="Pay Super, straight from MYOB"
      description="Get more time back by paying your employees' super contributions directly from MYOB - it's simple, secure and SuperStream ready."
      image={
        <img
          src={accessDeniedImage}
          style={{ width: '60%' }}
          alt="Not registered for PaySuper"
        />
      }
      actions={[signUpButton]}
    />
  );
};

export default UnregisteredPageState;
