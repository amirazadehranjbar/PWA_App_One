import React from 'react'
import ScrollAnimations from "./components/scrollAnimations/scrollAnimations.jsx";
import MyHeader from "./components/header/myHeader.jsx";
import {Route, Routes} from "react-router-dom";
import MovieDetails from "./components/movieDetails/movieDetails.jsx";
import Swal from "sweetalert2";
import UseInstallApp from "./hooks/useInstallApp.js";

const App = () => {

    return (
        <div className="bg-slate-500  w-full flex flex-col overflow-x-hidden">
            <MyHeader/>
            <Routes>
                <Route path="/" element={<ScrollAnimations/>}/>
                <Route path="/movie-details" element={<MovieDetails/>} />
            </Routes>
            <div id="installAppDiv" className="w-full bg-slate-300 py-2 flex flex-row items-center justify-around">
                <button className={`bg-slate-600 w-1/4 self-center-safe px-4 py-2 rounded-md cursor-pointer`}
                        id="yes">Install App</button>

                <button className={`bg-slate-600 w-1/4 self-center-safe px-4 py-2 rounded-md cursor-pointer`}
                        id="no">Don`t install</button>
            </div>

        </div>
    )
}
export default App
