import React from 'react'
import {useSelector} from "react-redux";
import useSearch from "../../hooks/useSearch.js";

const MyHeader = () => {

    // import movies data
    const {moviesList, isLoading, error} = useSelector(state => state.movieSlice);

    // search operation ******************************************************

    const {filteredList ,handleSetSearchTerm} = useSearch(moviesList)
    // ************************************************************************

    const clickSearch=()=>{
        console.log(filteredList )
    }


    return (
        <div className="absolute top-0 left-0 right-0 h-20 bg-slate-700 flex items-center flex-row justify-around">
            <input className="bg-slate-400 p-2" onChange={(e)=>{handleSetSearchTerm(e)}}/>
            <button className="bg-slate-400 py-2 px-6 rounded-md" onClick={clickSearch}>search movie</button>
        </div>
    )
}
export default MyHeader
