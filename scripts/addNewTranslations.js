const fs = require("fs");
const path = require("path");

const dirPath = path.resolve(__dirname, "../src/i18n");

const newTranslations = {
  key: "Value",
};

const languages = ["ar", "bg", "cs", "de", "en", "el", "fr", "ko", "pt"];

const fileList = fs.readdirSync(dirPath).reduce((acc, file) => {
  const basename = path.basename(file, ".json");
  const shouldAddTranslation = languages.includes(basename);

  return shouldAddTranslation ? [...acc, path.join(dirPath, file)] : acc;
}, []);

fileList.forEach((f) => {
  if (!fs.existsSync(f)) return;

  const langData = {
    ...JSON.parse(fs.readFileSync(f, "utf8")),
    ...newTranslations,
  };

  fs.writeFileSync(f, JSON.stringify(langData, null, 2));
  console.log(`Updated: ${f}`);
});
