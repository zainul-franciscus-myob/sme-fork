import isLinkUserPage from '../isLinkUserPage';

describe('isLinkUserPage', () => {
  it("should be true if the url path parameters start with the string 'linkUser'", () => {
    const currentURL =
      'http://localhost:3000/#/au/123/linkUser?redirectURL=blah';

    const result = isLinkUserPage(currentURL);

    expect(result).toEqual(true);
  });

  it("should be false if the url path parameters don't start with 'linkUser'", () => {
    const currentURL = 'http://localhost:3000/#/au/123/transactionList';

    const result = isLinkUserPage(currentURL);

    expect(result).toEqual(false);
  });

  it("should be false if the term 'linkUser' exists as part of the query params", () => {
    const currentURL =
      'http://localhost:3000/#/au/123/transactionList?something=linkUser';

    const result = isLinkUserPage(currentURL);

    expect(result).toEqual(false);
  });
});
