import { Button } from '@myob/myob-widgets';
import React from 'react';

// Rendering a Feelix Button as an `<a>`
const LinkButton = ({
  href,
  isOpenInNewTab,
  icon,
  iconRight,
  children,
  className,
}) => (
  <Button
    as="a"
    type="link"
    icon={icon}
    iconRight={iconRight}
    href={href}
    target={isOpenInNewTab ? '_blank' : undefined}
    className={className}
  >
    {children}
  </Button>
);

export default LinkButton;
