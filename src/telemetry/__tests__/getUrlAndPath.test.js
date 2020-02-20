import { parsePath, parseUrl } from '../parseUrlAndPath';


describe('getUrl', () => {
  [
    {
      url: 'https://app.myob.com/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/dashboard',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://app.myob.com/au/dashboard',
    },
    {
      url: 'https://app.myob.com/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/quote/1',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://app.myob.com/au/quote/quoteDetail',
    },
    {
      url: 'https://app.myob.com/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/supplierReturn/1/applyToPurchase/new',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://app.myob.com/au/supplierReturn/supplierReturnDetail/applyToPurchase/new',
    },
    {
      url: 'https://app.myob.com/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/employee/1?mainTab=contactDetails',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://app.myob.com/au/employee/employeeDetail?mainTab=contactDetails',
    },
    {
      url: 'https://app.myob.com/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/payItem/wage/1',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://app.myob.com/au/payItem/wage/wageDetail',
    },
    {
      url: 'https://localhost:3000/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/receiveRefund/23',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://localhost:3000/au/receiveRefund/receiveRefundDetail',
    },
    {
      url: 'https://localhost:3000/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/quote/new',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://localhost:3000/au/quote/new',
    },
    {
      url: 'https://localhost:3000/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/customerReturn/1/applyToSale/new',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://localhost:3000/au/customerReturn/customerReturnDetail/applyToSale/new',
    },
    {
      url: 'https://crabdance.app.myob.com/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/transactionList?sourceJournal=General',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://crabdance.app.myob.com/au/transactionList?sourceJournal=General',
    },
    /*
      Test example for a scenario where multiple id's were to ever appear in our URL's.
    */
    {
      url: 'https://crabdance.app.myob.com/#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/invoice/123/bill/512',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutUrl: 'https://crabdance.app.myob.com/au/invoice/invoiceDetail/bill/billDetail',
    },
  ].forEach((test) => {
    it(`should parse out ${test.url} correctly`, () => {
      const actual = parseUrl(test.url, test.businessId);
      expect(actual).toEqual(test.parsedOutUrl);
    });
  });
});

describe('getPath', () => {
  [
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/dashboard',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/dashboard',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/quote/1',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/quote/quoteDetail',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/supplierReturn/1/applyToPurchase/new',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/supplierReturn/supplierReturnDetail/applyToPurchase/new',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/employee/1?mainTab=contactDetails',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/employee/employeeDetail?mainTab=contactDetails',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/payItem/wage/1',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/payItem/wage/wageDetail',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/receiveRefund/23',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/receiveRefund/receiveRefundDetail',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/quote/new',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/quote/new',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/customerReturn/1/applyToSale/new',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/customerReturn/customerReturnDetail/applyToSale/new',
    },
    {
      path: '#/au/0b591022-d405-4bb8-93d9-c1c79ff1afbd/transactionList?sourceJournal=General',
      businessId: '0b591022-d405-4bb8-93d9-c1c79ff1afbd',
      parsedOutPath: '/au/transactionList?sourceJournal=General',
    },
  ].forEach((test) => {
    it(`should parse out ${test.path} correctly`, () => {
      const actual = parsePath(test.path, test.businessId);
      expect(actual).toEqual(test.parsedOutPath);
    });
  });
});
