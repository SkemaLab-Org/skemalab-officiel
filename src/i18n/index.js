import { defaultLocale, locales } from "./config";
import { fr } from "./translations/fr";
import { ar } from "./translations/ar";
import { en } from "./translations/en";

const dictionaries = {
  fr,
  ar,
  en,
};

export { defaultLocale, locales };

export function getDictionary(locale = defaultLocale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
