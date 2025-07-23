import {useMemo, useState} from "react";

const useSearch = (list)=>{
    const [searchTerm, setSearchTerm] = useState('');
    const handleSetSearchTerm =(inputEvent)=>{
        setSearchTerm(inputEvent.target.value);
    }
    const filteredList = useMemo(() => {
        return list.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [list, searchTerm]);

    return {filteredList, handleSetSearchTerm};
};

export default useSearch;