import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// Async thunk
//region fetch movies
export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("https://parseapi.back4app.com/classes/movies", {
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": "yQ4VwNXWCjBIOJMyo6WKPr4Zv5znl7v1wFKguEvL",
                    "X-Parse-REST-API-Key": "ch3aXQMg2kFqTPq4hXlAlGRUCToBtIjqZJ3zXzmE",
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            return data.results;
        } catch (e) {
            return thunkAPI.rejectWithValue(`Failed to fetch movies ${e}`);
        }
    }
);
//endregion

//region post new movie
export const postMovie = createAsyncThunk(
    "movies/postMovie",
    async (newMovie,thunkAPI)=>{
        try {
            const response = await fetch("https://parseapi.back4app.com/classes/movies", {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": "yQ4VwNXWCjBIOJMyo6WKPr4Zv5znl7v1wFKguEvL",
                    "X-Parse-REST-API-Key": "ch3aXQMg2kFqTPq4hXlAlGRUCToBtIjqZJ3zXzmE",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMovie)
            });
            return response.status;
        }catch (e) {
            return thunkAPI.rejectWithValue(`post new movie failed ${e}`);
        }
    }
);
//endregion

//region delete movie
export const deleteMovie = createAsyncThunk(
    "movies/deleteMovie",
    async (movieID,thunkAPI)=>{
        try {

            await fetch(`https://parseapi.back4app.com/classes/movies/${movieID}`,{
                method:"DELETE",
                headers: {
                    "X-Parse-Application-Id": "yQ4VwNXWCjBIOJMyo6WKPr4Zv5znl7v1wFKguEvL",
                    "X-Parse-REST-API-Key": "ch3aXQMg2kFqTPq4hXlAlGRUCToBtIjqZJ3zXzmE",
                    "Content-Type": "application/json",
                },
            });

        }catch (e) {
            return thunkAPI.rejectWithValue(`delete operation failed ${e}`)
        }
    }
)
//endregion

// Slice

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        isLoading: false,
        isPosting:false,
        isDeleting:false,
        moviesList: [],
        error: null
    },
    extraReducers: builder => {
        builder
            //region fetch movies
            .addCase(fetchMovies.pending, (movies) => {
                movies.isLoading = true;
                movies.error = null;
            })
            .addCase(fetchMovies.fulfilled, (movies, action) => {
                movies.isLoading = false;
                movies.error = null;
                movies.moviesList = action.payload;
            })
            .addCase(fetchMovies.rejected , (movies , action)=>{
                movies.isLoading = false;
                movies.error = action.payload || "something went wrong..."
            })
           //endregion

            //region post new movie
            .addCase(postMovie.pending , (movies)=>{
                movies.isPosting = true;
                movies.error = false;
            })

            .addCase(postMovie.fulfilled , (movies,action)=>{
                movies.isPosting = false;
                movies.error = null;
                movies.moviesList.push(action.payload);
            })

            .addCase(postMovie.rejected , (movies,action)=>{
                movies.isPosting = false;
                movies.error = action.payload;
            })
            //endregion

            //region delete movie
            .addCase(deleteMovie.pending , (movies)=>{
                movies.isDeleting = false;
                movies.error = null;
            })

            .addCase(deleteMovie.fulfilled , (movies, action)=>{
                movies.isDeleting = false;
                movies.error = null;
                movies.moviesList = movies.moviesList.filter(movie=> movie.objectId !== action.meta.arg);
            })

            .addCase(deleteMovie.rejected , (movies, action)=>{
                movies.isDeleting = false;
                movies.error = action.payload;
            })
            //endregion
    }
})

export const actions = movieSlice.actions;
export default movieSlice.reducer;