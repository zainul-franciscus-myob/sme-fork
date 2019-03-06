export default {
  entries: [
    {
      id: '1',
      code: 'GST',
      description: 'Goods & Services Tax',
      rate: '10',
      codeType: 'Goods and Services',
      collectedAccountName: '2-1220 GST Collected',
      paidAccountName: '2-1221 GST Paid',
    },
    {
      id: '2',
      code: 'ABN',
      description: 'No ABN Witholding',
      rate: '-47',
      codeType: 'No ABN/TFN',
      collectedAccountName: '2-1230 ABN Collected',
      paidAccountName: '2-1231 ABN Paid',
    },
  ],
};
