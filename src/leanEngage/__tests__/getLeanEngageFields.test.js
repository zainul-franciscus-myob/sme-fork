import getLeanEngageFields from '../getLeanEngageFields';

describe('getLeanEngageFields', () => {
  const appId = 'appId';

  it('should set the user\'s id if they\'ve logged in', () => {
    const user = {
      userId: 'exists',
    };

    const expected = {
      user_id: 'exists',
      app_id: 'appId',
    };

    const actual = getLeanEngageFields(user, appId);

    expect(actual).toEqual(expected);
  });

  it('should not set the user\'s id if they have not logged in', () => {
    const user = undefined;
    const expected = {
      app_id: 'appId',
    };
    const actual = getLeanEngageFields(user, appId);

    expect(actual).toEqual(expected);
  });
});
