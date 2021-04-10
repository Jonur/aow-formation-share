const getTinyURL = async (longURL) => {
  let headers = new Headers();

  headers.append(
    "Access-Control-Allow-Origin",
    "https://aowformationshare.jonur.io"
  );
  headers.append("Access-Control-Allow-Methods", "GET");
  headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const tinyURL = await fetch(
    `https://jonurmail.000webhostapp.com/tiny.php?longUrl=${longURL}`,
    {
      headers,
    }
  );
  console.log({ tinyURL });
};

export default getTinyURL;
