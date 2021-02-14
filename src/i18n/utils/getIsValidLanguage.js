import languages from "../";

const getIsValidLanguage = (languageCode) =>
  !!languages[languageCode] ? languageCode : "";

export default getIsValidLanguage;
