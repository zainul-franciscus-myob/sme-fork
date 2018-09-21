import fetch from 'cross-fetch';

const configURL = `${process.env.REACT_APP_BASE_URL}/config-${process.env.REACT_APP_BUILD_NUMBER || 'dev'}.json`;

const Config = {};

const initializeConfig = async () => {
  const isConfigInitalized = Object.keys(Config).length !== 0;
  if (isConfigInitalized) {
    return;
  }

  const res = await fetch(configURL);
  const localConfig = await res.json();

  Object.assign(Config, localConfig);
  Object.freeze(Config);
};

export default Config;
export { initializeConfig };
