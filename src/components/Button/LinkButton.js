import { Button } from '@myob/myob-widgets';
import React from 'react';

const LinkButton = ({ href, isOpenInNewTab, ...props }) => {
  const goTo = () => {
    if (isOpenInNewTab) {
      window.open(href, '_blank');
    } else {
      window.location.assign(href);
    }
  };

  return (
    <Button
      {...props}
      onClick={goTo}
    />
  );
};

export default LinkButton;
