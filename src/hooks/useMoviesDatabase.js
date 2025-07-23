// src/hooks/useMoviesDatabase.js
import {useEffect, useState} from "react";

const UseMoviesDatabase = (type = "GET") => {

    const [moviesData, setMoviesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({isError: false, errorMessage: ""});

    useEffect(() => {
        setLoading(true);
        fetch("https://parseapi.back4app.com/classes/movies", {
            method: type,
            headers: {
                "X-Parse-Application-Id": "yQ4VwNXWCjBIOJMyo6WKPr4Zv5znl7v1wFKguEvL",
                "X-Parse-REST-API-Key": "ch3aXQMg2kFqTPq4hXlAlGRUCToBtIjqZJ3zXzmE",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMoviesData(data.results);
                setLoading(false);
                setError({isError: false, errorMessage: ""});
            })
            .catch((err) => {
                setError({isError: true, errorMessage: err.message || "Something went wrong"});
                setLoading(false);
            });

    }, [type]);

    return {moviesData , loading , error};
};

export default UseMoviesDatabase;