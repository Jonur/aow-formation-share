const getUrlParamHashes = () => {
  const decodedURL = decodeURIComponent(window.location.href);

  const urlParamHashes = decodedURL
    .slice(decodedURL.indexOf("?") + 1)
    ?.split("&");

  return urlParamHashes;
};

export default getUrlParamHashes;
