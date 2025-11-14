import { useEffect, useState } from "react";
import { fileListApi } from "../api/fileListApi";
import { useDispatch } from "react-redux";
import { synchronize } from "../store/dataSlice";
import { searchlist } from "../store/searchItemsSlice";
import { initializeAuth } from "../store/authSlice";
import useAppTranslation from "../libs/useAppTranslation";
import { loadLanguage } from "../store/languageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import titles from "../i18n/documents.json";


export default function Synchronize({ dir }) {
    const [process, setProcess] = useState(false);
    const dispatch = useDispatch();
    const { i18n } = useAppTranslation();

    /*
    useEffect(() => {
        setProcess(true);
        (async () => {
            dispatch(initializeAuth());
            const result = await fileListApi({dir});            
            if(result.status) {
                const items = result.data.map(item => {
                    return {
                        dir: {
                            title: item.dir.title,
                            path: item.dir.path
                        },
                        dirs: item.dirs
                    }
                });
                dispatch(synchronize(items));                
                
                const search_items = result.data.flatMap(item => 
                    item.dirs.flatMap(dir => dir.files)
                );
                dispatch(searchlist(search_items))
            }

            if(!result.status)
                dispatch(synchronize([]));    
            
            setProcess(false)
        })();
    }, [dir]);
    */


    useEffect(() => {
        setProcess(true);

        (async () => {
            dispatch(initializeAuth());

            const result = await fileListApi({ dir });

            if (result.status) {

                // --- TR DİZİN LİSTESİ (gelen veri olduğu gibi) ---
                const itemsTR = result.data.map(item => ({
                    dir: {
                        title: item.dir.title,     // TR başlık
                        path: item.dir.path        // TR path
                    },
                    dirs: item.dirs               // TR alt klasörler
                }));


                // --- EN DİZİN LİSTESİ (JSON’dan çevrilerek) ---
                const itemsEN = result.data.map(item => {
                    const trTitle = item.dir.title;
                    const enTitle = titles[trTitle] ?? trTitle; // eşleşmezse TR kalsın

                    return {
                        dir: {
                            title: enTitle,
                            path: enTitle
                        },
                        dirs: item.dirs.map(d => {
                            const trDirTitle = d.title;
                            const enDirTitle = titles[trDirTitle] ?? trDirTitle;

                            return {
                                ...d,
                                title: enDirTitle
                            };
                        })
                    };
                });


                // --- STORE'A GÖNDER ---
                dispatch(synchronize({ tr: itemsTR, en: itemsEN }));


                // --- SEARCH LIST TR ve EN ---
                const searchTR = result.data.flatMap(item =>
                    item.dirs.flatMap(dir => dir.files)
                );

                const searchEN = result.data.flatMap(item =>
                    item.dirs.flatMap(dir =>
                        dir.files.map(file => ({
                            ...file,
                            title: titles[file.title] ?? file.title
                        }))
                    )
                );

                dispatch(searchlist({ tr: searchTR, en: searchEN }));

            } else {
                dispatch(synchronize({ tr: [], en: [] }));
                dispatch(searchlist({ tr: [], en: [] }));
            }

            setProcess(false);
        })();
    }, [dir]);

    useEffect(() => {
        (async () => {
        const savedLang = await AsyncStorage.getItem("appLang");
        if (savedLang) {
            dispatch(loadLanguage(savedLang));
            i18n.changeLanguage(savedLang);
        }
        })();
    }, []);

    return null;
}