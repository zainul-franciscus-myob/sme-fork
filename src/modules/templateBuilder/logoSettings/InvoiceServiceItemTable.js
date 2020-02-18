import React from 'react';

import Table from '../../template/components/TemplatePreview/tables/Table';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';


const ServiceItemTable = ({ region }) => {
  const columns = [
    { key: 'itemId', name: 'Item ID', width: '70px' },
    { key: 'description', name: 'Description' },
    { key: 'unit', name: '', width: '30px' },
    {
      key: 'quantity',
      name: 'Units',
      width: '45px',
      rightAlign: true,
    },
    {
      key: 'unitPrice',
      name: 'Unit price ($)',
      width: '80px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
    {
      key: 'discount',
      name: 'Disc. (%)',
      width: '55px',
      rightAlign: true,
    },
    {
      key: 'taxCode',
      name: getRegionToDialectText(region)('Tax code'),
      width: '60px',
    },
    {
      key: 'amount',
      name: 'Amount ($)',
      width: '70px',
      rightAlign: true,
      description: getRegionToDialectText(region)('Including tax'),
    },
  ];

  const items = [
    {
      itemId: 'IT000001',
      description: 'Your example item',
      unit: 'Qty',
      quantity: '1',
      unitPrice: '10.00',
      discount: '',
      taxCode: '',
      amount: '10.00',
    },
  ];

  return <Table columns={columns} items={items} />;
};

export default ServiceItemTable;
