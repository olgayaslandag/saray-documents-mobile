import { useEffect, useState } from "react";
import { fileListApi } from "../api/fileListApi";
import { useDispatch } from "react-redux";
import { synchronize } from "../store/dataSlice";
import { searchlist } from "../store/searchItemsSlice";
import { initializeAuth } from "../store/authSlice";
import useAppTranslation from "../libs/useAppTranslation";
import { loadLanguage } from "../store/languageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Synchronize({ dir }) {
    const [process, setProcess] = useState(false);
    const dispatch = useDispatch();
    const { i18n } = useAppTranslation();

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