const removeEmptyEntries = (data) =>
  Object.keys(data).reduce((acc, entry) => {
    return data[entry].count > 0 ? { ...acc, [entry]: data[entry] } : acc;
  }, {});

export default removeEmptyEntries;
