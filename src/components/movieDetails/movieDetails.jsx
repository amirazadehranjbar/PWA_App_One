import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";

const MovieDetails = () => {

    const {state} = useLocation();
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">

                <img src={state.image} alt="" width={250} height={250} className="rounded-md"/>

            <p className="text-xl text-slate-300">{state.title}</p>
            <button onClick={() => {
                navigate(-1);
            }}>back
            </button>
        </div>
    )
}
export default MovieDetails
