import React from 'react';

import Table from './Table';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const ServiceTable = ({ region, shouldShowTaxCodeAndAmount }) => {
  const columns = [
    { key: 'description', name: 'Description' },
    {
      key: 'taxCode',
      name: getRegionToDialectText(region)('Tax code'),
      width: '55px',
    },
    {
      key: 'amount',
      name: 'Amount ($)',
      width: '90px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
  ];
  const taxCode = shouldShowTaxCodeAndAmount ? 'GST' : 'N-T';
  const items = [
    {
      description: 'Dog walking',
      taxCode,
      amount: '40.00',
    },
    {
      description: 'Deluxe grooming package',
      taxCode,
      amount: '135.00',
    },
    {
      description: 'Organic shampoo option',
      taxCode,
      amount: '15.00',
    },
  ];

  return <Table columns={columns} items={items} />;
};
export default ServiceTable;
