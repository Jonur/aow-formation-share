const getIntlNumber = (language, num) => {
  const shouldRestyleDecimals = num % 10 !== 0;
  const styledNumber = shouldRestyleDecimals ? parseFloat(num).toFixed(2) : num;
  return new Intl.NumberFormat(language).format(styledNumber);
};

export default getIntlNumber;
