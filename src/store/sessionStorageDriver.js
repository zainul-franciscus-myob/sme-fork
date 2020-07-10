const save = (key, obj) => {
  try {
    const value = JSON.stringify(obj);
    sessionStorage.setItem(key, value);
  } catch {
    // sessionStorage is not available, ignore write error
  }
};

const load = (key) => {
  try {
    const value = sessionStorage.getItem(key);
    if (value === null) {
      return undefined;
    }
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

const remove = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // sessionStorage is not available, ignore clear error
  }
};

export const saveSettings = (businessId, routeName, settings) =>
  save(`${businessId}.${routeName}.settings`, settings);

export const loadSettings = (businessId, routeName) =>
  load(`${businessId}.${routeName}.settings`);

export const clearSettings = (businessId, routeName) =>
  remove(`${businessId}.${routeName}.settings`);
