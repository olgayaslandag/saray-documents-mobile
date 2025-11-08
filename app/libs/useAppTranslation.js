import { useState, useEffect } from "react";
import i18n from "../i18n";

export default function useAppTranslation() {
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const listener = (lng) => setLang(lng);
    i18n.on("languageChanged", listener);
    return () => i18n.off("languageChanged", listener);
  }, []);

  const t = i18n.t.bind(i18n);
  return { t, i18n, lang };
}