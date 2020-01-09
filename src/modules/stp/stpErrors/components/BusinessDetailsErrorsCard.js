import { Button, Card, Icons } from '@myob/myob-widgets';
import React from 'react';

const BusinessDetailsErrorsCard = ({ errors, onEditLinkClick }) => {
  if (errors.length < 1) {
    return null;
  }

  const businessDetailsErrorListItems = errors.map(e => (
    <li key={e.error}>{e.error}</li>
  ));
  return (
    <Card testid="businessDetailsCard">
      <h3>Business details</h3>
      <ul>
        {businessDetailsErrorListItems}
      </ul>
      <Button type="link" icon={<Icons.Edit />} onClick={onEditLinkClick}>Edit business details</Button>
    </Card>
  );
};

export default BusinessDetailsErrorsCard;
