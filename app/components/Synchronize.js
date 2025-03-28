import { useEffect, useState } from "react";
import { fileListApi } from "../api/fileListApi";
import { useDispatch } from "react-redux";
import { synchronize } from "../store/dataSlice";
import { searchlist } from "../store/searchItemsSlice";
import { initializeAuth } from "../store/authSlice";


export default function Synchronize({ dir }) {
    const [process, setProcess] = useState(false);
    const dispatch = useDispatch();

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

    return null;
}