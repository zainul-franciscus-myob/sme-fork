// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import React from 'react';

// inspired by
// https://github.com/testing-library/react-hooks-testing-library
// and https://medium.com/@nitinpatel_20236/unit-testing-custom-react-hooks-caa86f58510

export default (callback) => {
  const hook = {};
  const TestHook = () => {
    hook.current = callback();
    return null;
  };
  mount(<TestHook />);
  return hook;
};
