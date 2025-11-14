import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import titles from "../i18n/documents.json";
import useAppTranslation from "./useAppTranslation";
import { docSelect } from "../store/docSelectSlice";

export default function useTranslatedDocSelected() {
    const dispatch = useDispatch();
    const { lang } = useAppTranslation();  
    const selected = useSelector(state => state.docSelect.value);
  
    // JSON'u tersine çevir (EN → TR)
    const reversedTitles = useMemo(() => {
        const obj = {};
        Object.keys(titles).forEach(key => {
            obj[titles[key]] = key;
        });
        return obj;
    }, []);

    // Seçili dokümanı dile göre çevir
    const docSelected = useMemo(() => {
        if (!selected) return null;

        if (lang === "en") {
            // TR → EN
            return titles[selected] || selected;
        }

        if (lang === "tr") {
            // EN → TR
            return reversedTitles[selected] || selected;
        }

        return selected;
    }, [selected, lang, reversedTitles]);

    // Yeni seçim yapıldığında Redux’a doğru formatta yaz
    function setDocSelected(title) {
        if (lang === "en") {
            // EN seçildi → TR karşılığını Redux'a yaz
            const trValue = reversedTitles[title] || title;
            dispatch(docSelect(trValue));
        } else {
            // TR seçildi → direkt Redux'a yaz
            dispatch(docSelect(title));
        }
    }

    return {
        docSelected,
        setDocSelected
    };
}