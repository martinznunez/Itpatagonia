export const getSessionStorage = (queryStorage: string) => {
  const data = sessionStorage.getItem(queryStorage);
  return data ? JSON.parse(data) : null;
};

export const saveSessionStorage = (queryStorage: string, value: unknown) => {
  const valueString = JSON.stringify(value);

  return sessionStorage.setItem(queryStorage, valueString);
};
