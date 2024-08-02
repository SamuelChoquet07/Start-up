export const arrayLength = (array, key, subkey, value) => {
  const arrayFilter = array.filter((e) => {
    return e[key][subkey] === value;
  });
  return arrayFilter.length;
};

export const arrayNumber = (array, key, value) => {
  const arrayFilter = array?.filter((e) => {
    return e[key] === value;
  });
  return arrayFilter?.length;
};
