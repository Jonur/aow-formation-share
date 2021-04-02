const fs = require("fs");
const path = require("path");

const dirPath = path.resolve(__dirname, "../src/i18n");

const newTranslations = {
  "app.tabs.statistics": "Formation statistics",
  "statistics.header.totalHP": "Total formation HP",
  "statistics.details.totalHP": `The number above includes the total HP of the hero and troops in the
  formation, as well as fixed-number summons, like the Pirates of a Pirate
  Ship and the Beast Master's Best Partner. But it does not include the HP
  of Necromancer's Skeletons, as their number changes during battle.`,
  "statistics.header.formation.count": "Troop and Hero count",
  "statistics.header.formation.analysis": "Troop formation analysis",
  "statistics.header.formation.races": "Races in the formation",
  "statistics.header.formation.grades": "Grades in the formation",
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
