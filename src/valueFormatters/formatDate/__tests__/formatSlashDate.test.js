import formatSlashDate from '../formatSlashDate';

describe('formatSlashDate', () => {
  it('formats date as iso date string', () => {
    const date = new Date(2019, 9, 7);

    const actual = formatSlashDate(date);

    expect(actual).toEqual('07/10/2019');
  });
});
