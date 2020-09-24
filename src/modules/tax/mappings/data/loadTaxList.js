export default {
  entries: [
    {
      id: '1',
      code: 'GST',
      description: 'Goods & Services Tax',
      rate: '10',
      codeType: 'Goods and Services',
      collectedAccountName: '2-1220 GST Collected',
      collectedAccountIsActive: true,
      paidAccountName: '2-1221 GST Paid',
      paidAccountIsActive: true,
    },
    {
      id: '2',
      code: 'ABN',
      description: 'No ABN Witholding',
      rate: '-47',
      codeType: 'No ABN/TFN',
      collectedAccountName: '2-1230 ABN Collected',
      collectedAccountIsActive: true,
      paidAccountName: '2-1231 ABN Paid into a longer account name',
      paidAccountIsActive: false,
    },
  ],
};
