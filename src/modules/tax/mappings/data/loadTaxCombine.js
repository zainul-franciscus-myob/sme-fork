export default {
  taxCodeOptions: [
    {
      id: 1,
      displayName: 'GST',
      description: 'Goods & Services Tax',
      displayRate: '10%',
    },
    {
      id: 2,
      displayName: 'ABN',
      description: 'No ABN Witholding',
      displayRate: '-47%',
    },
    {
      id: 3,
      displayName: 'FRE',
      description: 'GST Free',
      displayRate: '0%',
    },
    {
      id: 4,
      displayName: 'LCG',
      description: 'Consolidated LCT & GST',
      displayRate: '0%',
    },
  ],
};
