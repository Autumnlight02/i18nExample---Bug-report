import i18next, { type InitOptions } from "i18next";
const languages = ["de"];

const initOptions = {
  initImmediate: false,
  ignoreJSONStructure: false,
  fallbackLng: false,
  supportedLngs: languages,
} as InitOptions;

const initializeI18n = async (): Promise<void> => {
  const namespace = "default";
  if (!i18next.isInitialized) {
    await i18next.init({
      ...initOptions,
    });

    i18next.addResourceBundle("de", namespace, { lang: "german" });
    i18next.addResourceBundle("en", namespace, { lang: "english" });
    //does not work
    await i18next.loadLanguages("en", (err, t) => {});
    //does not work
    await i18next.changeLanguage("en").then(() => {
      console.log(`Language switched to: ${"en"}`);
    });
    //works but is forbidden by types
    // i18next.options.supportedLngs!.push("en");
  }

  console.log(
    "expecting german: ",
    i18next
      .t("lang", {
        lng: "de",
        ns: namespace,
        defaultValue: "fallback",
      })
      .toString()
  );
  console.log(
    "expecting english: ",
    i18next
      .t("lang", {
        lng: "en",
        ns: namespace,
        defaultValue: "fallback",
      })
      .toString()
  );
};

initializeI18n();
