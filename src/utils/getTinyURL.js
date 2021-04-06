const getTinyURL = async (longURL) => {
  const tinyURL = await fetch(
    `https://jonurmail.000webhostapp.com/tiny.php?longUrl=${longURL}`
  );
  console.log({ tinyURL });
};

export default getTinyURL;
