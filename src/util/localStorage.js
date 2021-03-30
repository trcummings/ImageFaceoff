const PREFIX = "ImageFaceoff--";
export const setInStorage = (key, value) => {
  const prefixedKey = `${PREFIX}${key}`;

  localStorage.setItem(prefixedKey, JSON.stringify(value));
};

export const getFromStorage = (key) => {
  const prefixedKey = `${PREFIX}${key}`;

  const jsonValue = localStorage.getItem(prefixedKey);

  if (jsonValue !== null) return JSON.parse(jsonValue);
  return null;
};

export const clearFromStorage = (key) => {
  const prefixedKey = `${PREFIX}${key}`;

  localStorage.removeItem(prefixedKey);
};
