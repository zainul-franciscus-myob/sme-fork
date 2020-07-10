const save = (key, obj) => {
  try {
    const value = JSON.stringify(obj);
    localStorage.setItem(key, value);
  } catch {
    // localStorage is not available, ignore write error
  }
};

const load = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return undefined;
    }
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

export const saveSettings = (businessId, routeName, settings) =>
  save(`${businessId}.${routeName}.settings`, settings);

export const loadSettings = (businessId, routeName) =>
  load(`${businessId}.${routeName}.settings`);
